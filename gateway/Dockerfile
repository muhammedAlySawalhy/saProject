# Use the official Node.js 14 image as the parent image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app/gateway

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application's source code to the container
COPY . .

# Expose port 5000 to the host machine
EXPOSE 5000

# Start the API Gateway application
CMD [ "npm", "start" ]
