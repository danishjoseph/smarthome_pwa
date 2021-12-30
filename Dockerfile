FROM node:14-alpine

COPY ./build ./build
RUN npm install serve

CMD npx serve -s build
