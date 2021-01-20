#!/bin/bash

image_name=marionette:2

package() {
  docker rmi -f $image_name
  docker build -f deploy/Dockerfile -t $image_name  .
  docker save -o marionette.tar $image_name
}

deploy() {
  docker load -i marionette.tar
}

# 开始菜单
start_menu() {
    echo "======================================"
    echo "Marionette     Build  by: DollarKiller"
    echo "======================================"
    echo "1.当前系统docker打包"
    echo "2.当前系统docker部署"
    echo "0.退出脚本"
    read -p "请输入数字" num
    case "$num" in
        1)
          echo "启动Docker打包"
          package
        ;;
        2)
          echo "Docker部署"
          deploy
        ;;
        0)
          exit 1
        ;;
        *)
        clear
        echo "请输入正确数字"
        sleep 3s
        start_menu
        ;;
    esac
}

start_menu