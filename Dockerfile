FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# COPY ./src/config/config.env ./src/config/config.env
RUN npm run lint
RUN npm run swagger
RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "start"]