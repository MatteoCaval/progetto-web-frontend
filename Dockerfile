# Dockerfile for React client

# Build react client
FROM node:13.10.1

# Working directory be app
WORKDIR /usr/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3000