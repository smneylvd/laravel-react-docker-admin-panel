# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:18

WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies with --legacy-peer-deps flag to avoid conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the application files to the container
COPY . .

CMD ["npm", "start"]
