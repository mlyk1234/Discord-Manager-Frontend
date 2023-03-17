FROM node:18.12.1-alpine
WORKDIR /frontend
COPY . /frontend

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]