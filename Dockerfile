# Use Node.js as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the script file
COPY apify_crawler.js .

# Expose any necessary ports (if applicable)
# EXPOSE <port_number>

# Define the command to run the script
CMD ["node", "apify_crawler.js"]
