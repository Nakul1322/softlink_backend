FROM node:12.16.3-buster-slim
WORKDIR /app
COPY package*.json ./
RUN openssl genrsa -out .private.pem 4096 && openssl rsa -in .private.pem -pubout > .public.pem
RUN npm i
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
