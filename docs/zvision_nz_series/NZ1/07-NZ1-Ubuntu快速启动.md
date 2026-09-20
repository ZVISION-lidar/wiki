# 7. NZ1 快速启动（Ubuntu）

📄 [Download English PDF: NZ1 Quick Start Guide](./assets/pdf/NZ1-Quick-Start-Guide.pdf)

📄 [下载中文PDF：NZ1 快速启动](./assets/pdf/NZ1快速启动1.4.0.pdf)

## 7.1 硬件设备安装
硬件组成：NZ1主机、数据线、电源线（电源适配器需用户自行准备）
PC端：需要安装ubuntu20.04 ROS1/ROS2或ubuntu22.04 ROS2环境

## 7.2 设备连接PC
```shell
lsusb
# 2207：0019即为NZ1 USB设备号
Bus 002 Device 014: ID 2207:0019 Fuzhou Rockchip Electronics Company hawk
```

## 7.3 获取驱动

```shell
git clone https://github.com/manifoldsdk/NZ_ros_driver.git
```

## 7.4 创建 udev rules
```shell
sudo gedit /etc/udev/rules.d/99-NZ-usb.rules
# 将下述内容粘贴到99-NZ-usb.rules文件中，保存
SUBSYSTEM=="usb", ATTR{idVendor}=="2207", ATTR{idProduct}=="0019", MODE="0666", GROUP="plugdev"
# 重新加载并导入设备
sudo udevadm control --reload
sudo udevadm trigger
```

## 7.5 运行驱动
> **📌 运行驱动之前请确保设备已正常通电并接入电脑**

```shell
mkdir -p catkin_ws/src
# 手动将NZ_ros_driver放到src文件夹中,$PATH为用户自己使用路径
cp -r $PATH/NZ_ros_driver $PATH/catkin_ws/src
# 驱动提供了编译脚本，路径为：catkin_ws/src/NZ_ros_driver/script/
./build_ros2.sh      # ros1则运行build_ros.sh
cd $PATH/catkin_ws
source install/setup.bash
ros2 launch NZ_ros_driver NZ1_ros2.launch.py
```

<!-- TODO: 图片资源待补齐（原 assets/img/ros2_result.png）-->
