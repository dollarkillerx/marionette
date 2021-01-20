FROM alekzonder/puppeteer:latest
WORKDIR /app
COPY . /app
RUN npm config set registry https://registry.npm.taobao.org
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn install
CMD ["node","dist/main.js"]
EXPOSE 3030