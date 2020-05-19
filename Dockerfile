FROM node:slim
WORKDIR /app
COPY . /app
RUN yarn install
COPY . . 
EXPOSE 3000
CMD ["node","index.js"]