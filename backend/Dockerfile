FROM node:21.6.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Prisma schema file
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the backend code
COPY . .

# Expose both the application and Prisma Studio ports
EXPOSE 4000
EXPOSE 5555

# Add a start script that includes database migrations
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && npx prisma generate && node index.js"]