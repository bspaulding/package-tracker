FROM node:dubnium
COPY . .
RUN npm ci
RUN npm start
