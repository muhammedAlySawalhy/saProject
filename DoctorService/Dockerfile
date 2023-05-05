# Use Node.js 14 as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app/DoctorService

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies

RUN yarn install

# Copy the rest of the application code
COPY . .

# Set the command to run when the container starts
CMD ["yarn", "start"]
