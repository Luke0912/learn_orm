# Use Node.js 21 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only the package files to install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the entire project directory to the container
COPY . .

# Copy Drizzle migration files and configuration explicitly (root-level drizzle folder)
COPY drizzle ./drizzle
COPY drizzle.config.js ./drizzle.config.js

# Expose the application port
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
