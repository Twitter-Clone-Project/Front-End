FROM node

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5173 (the port your app is running on)
EXPOSE 5173

# Start the app using the full path to npm
CMD npm run dev
