FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
RUN npm run build
COPY ./.env ./dist/
COPY ./acronym.json ./dist/
WORKDIR ./dist

CMD node index.js