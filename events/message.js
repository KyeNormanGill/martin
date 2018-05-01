const { Permissions } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    const { prefix } = message.client;

    // Mention check.
    const mentionRegex = new RegExp(`^<@!?${message.client.user.id}>`);
    const isMention = mentionRegex.test(message.content);

    if (!message.content.startsWith(prefix) && !isMention) return;

    // Get command name.
    const commandName = isMention
        ? message.content.split(' ').slice(1)[0] || ''
        : message.content.slice(prefix.length).split(' ')[0].toLowerCase();

    // Get command.
    const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Send message perm check. CURRENTLY BROKEN ON MASTER FOR SOME REASON.
    /*if (message.channel.type === 'text' && message.channel.permissionsFor(message.guild.me).missing('SEND_MESSAGES')) {
        console.log(`Perm to text: ${!!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')}`);
        message.author.send(`I do not have permission to speak in ${message.channel.toString()}`).catch(console.log);
    }*/

    // Owner only check
    if (command.ownerOnly && message.client.ownerId !== message.author.id) return;

    // GuildOnly Check.
    if (command.guildOnly && message.channel.type !== 'text') return;

    // Permissions check
    if (command.perms) {
        let text = '';
        command.perms.forEach(perm => {
            if (!Object.keys(Permissions.FLAGS).includes(perm)) {
                throw Error(`Command ${command.name} has an invalid permission name: ${perm}`);
            } else
            if (!message.channel.permissionsFor(message.client.user).has(perm)) {
                text += `${perm}\n`;
            }
        });
        if (text) {
            return message.channel.send(`Permission error, please give me the following permission(s) to use this command\`\`\`${text}\`\`\``);
        }
    }

    const args = message.content.split(' ').slice(isMention ? 2 : 1).join(' ');

    try {
        await command.run(message, args);

        console.log(oneLine`
            [${message.author.tag}] 
            [${command.group}:${command.name}] 
            [args: ${args}] 
            ${message.guild ? `[guild: ${message.guild.name}, channel: ${message.channel.name}]` : ''}
        `);
    } catch (err) {
        console.error(err);
        message.channel.send(`An error occured while trying to run **${command.name}.**\`\`\`${err.name}: ${err.message}\`\`\`Please contact: **${message.client.users.get(message.client.ownerId).tag}**`);
    }
};
