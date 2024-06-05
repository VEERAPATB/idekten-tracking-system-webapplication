FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY . .

EXPOSE 3000

RUN npm install
RUN npm run build

CMD [ "npm", "start" ]