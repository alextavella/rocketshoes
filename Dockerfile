FROM node:8-alpine
WORKDIR /app

# copy code, install npm packages
COPY package*.json ./
RUN npm install

# copy source
COPY src/ ./
COPY public/ ./public

# expose the port
EXPOSE 3001

# build app
RUN npx json-server server.json -p 3333
RUN npm run build

# run app
CMD ["npx", "serve", "-s", "build", "-p", "3001"]
