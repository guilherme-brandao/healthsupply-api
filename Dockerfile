FROM node:12.10-alpine

WORKDIR /healthsupply

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3030

CMD ["npm", "start"]