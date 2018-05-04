# Linux distro with node.js pre-installed
FROM node:9-alpine
# My credentials
LABEL maintainer "Artful <kyenormangill98@gmail.com>"
# Workdir
WORKDIR /usr/src/Martin
# Copy package.json and yarn.lock for Yarn
COPY package.json ./
# Install dependencies 
RUN apk add --update \
&& apk add --no-cache ffmpeg opus pixman cairo pango giflib ca-certificates \
&& apk add --no-cache --virtual .build-deps git curl pixman-dev cairo-dev pangomm-dev libjpeg-turbo-dev giflib-dev python g++ make \
# Install node.js dependencies
\
&& yarn install \
# Clean up build dependencies
&& apk del .build-deps
# Add project source
COPY . .
ENV token=\
    google=\
    cx=\
    darksky=\
    twitch=\
    lavalink=\
    osuKey=\
    botspw=\
    dbots=
# Run command
CMD ["node", "."]