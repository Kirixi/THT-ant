#Stage 1: Install dependencies
FROM node:20 AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production


#Stage 2: Production stage
FROM node:20-slim AS runtime

# Set the working directory
WORKDIR /app

RUN useradd -m -s /bin/bash appuser && chown -R appuser /app

USER appuser

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

ENV VARIABLE="this is for testing purposes only" 
# Run the application
CMD ["node", "app.js"]


