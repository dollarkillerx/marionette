FROM alekzonder/puppeteer:latest
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

#FROM node:12.18.4-alpine3.9
#WORKDIR /app
#COPY . /app
#RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
#    && apk -U --no-cache update && apk -U --no-cache --allow-untrusted add \
#      zlib-dev \
#      xorg-server \
#      dbus \
#      ttf-freefont \
#      chromium \
#      wqy-zenhei@edge \
#      bash \
#      bash-doc \
#      bash-completion -f
#
## 设置时区
#RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
#
## 设置环境变量
#ENV NODE_ENV production
#
## 清除npm缓存文件
#RUN npm cache clean --force && npm cache verify
#
#RUN npm config set registry https://registry.npm.taobao.org
#
## 安装依赖
#RUN npm install
#CMD ["node","src/index.js"]
#EXPOSE 3000

#FROM node:12-slim
#
#COPY sources.list /etc/apt/sources.list
##RUN  sed -i s@/deb.debian.org/@/mirrors.163.com/@g /etc/apt/sources.list
##RUN sed -i s/http:\/\/archive.ubuntu.com\/ubuntu\//http:\/\/RUN sed -i ‘s/http:\/\/archive.ubuntu.com\/ubuntu\//https:\/\/mirrors.aliyun.com\/ubuntu\//g’ /etc/apt/sources.list && apt-get update\/ubuntu\//g /etc/apt/sources.list
#
#RUN apt-get update \
#    && apt-get install -y wget gnupg \
#    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#    && apt-get update \
#    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
#      --no-install-recommends \
#    && rm -rf /var/lib/apt/lists/*
#
#WORKDIR /app
#COPY . /app
#
#RUN npm config set registry https://registry.npm.taobao.org
#
#RUN npm i puppeteer \
#    && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
#    && mkdir -p /home/pptruser/Downloads \
#    && chown -R pptruser:pptruser /home/pptruser \
#    && chown -R pptruser:pptruser /node_modules
#
## 安装依赖
#RUN npm install
#CMD ["node","src/index.js"]
#EXPOSE 3000