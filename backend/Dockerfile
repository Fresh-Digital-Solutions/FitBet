FROM node:21.6.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Prisma schema file
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the backend code
COPY . .

# Expose the port the app runs on
EXPOSE 8001

# Command to run the application
CMD ["node", "index.js"]
