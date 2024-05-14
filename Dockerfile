# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /api

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install