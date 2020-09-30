FROM buildkite/puppeteer:latest
WORKDIR /app
COPY . /app
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
CMD ["node","src/index.js"]
EXPOSE 3000

#FROM dollarkiller/node:v14
#WORKDIR /app
#COPY . /app
#RUN npm config set registry https://registry.npm.taobao.org
#RUN npm i
#CMD ["node","src/index.js"]
#EXPOSE 3000