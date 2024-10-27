#Stage 1: Install dependencies
FROM node:18 AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production


#Stage 2: Production stage
FROM node:18-slim AS runtime

# Set the working directory
WORKDIR /app

RUN useradd -m -s /bin/bash appuser && chown -R appuser /app

USER appuser

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

EXPOSE 8081

# Run the application
CMD ["node", "index.js"]
