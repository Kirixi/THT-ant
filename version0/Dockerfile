FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

ENV VARIABLE="this is for testing purposes only" 

# Run the application
CMD ["node", "app.js"]