FROM node:9-alpine

# Create app directory
WORKDIR /src/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# App must run on port 8000
EXPOSE 8000

CMD [ "node", "server.js" ]