FROM node:22-alpine

# Create app directory
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package*.json ./
RUN npm install

COPY . .
# Run the build command which creates the production bundle
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]