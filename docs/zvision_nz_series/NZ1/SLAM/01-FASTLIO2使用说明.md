# FAST-LIO2 使用说明

> ZVISION_NZ系列 在 **ROS 1 (Melodic / Noetic)** 或 **ROS 2 (Humble)** 下使用 FAST-LIO2 的指南。


![NZ5](../assets/img/fastlio2_zvsion_nz5mt_demo.gif){ .nb-cover-full-img }

---

## 1. 前置条件

开始前请准备：

- 已准备好 **Ubuntu + ROS** 环境（ROS 1 推荐 Melodic 或 Noetic；ROS 2 推荐 Humble）。
- 已安装**ZVISION 驱动**：`ZVISION_SDK`、`ZVISION_ROS`。
- 连接实机时，**激光雷达**、**主机网卡**、**驱动配置**三者位于同一子网。

---


## 2. 首次安装

选择一个 ROS 版本（下方 `~/xxx_ws` 工作空间命名仅作示例）。

### 2.1 支持环境

| ROS    | 分支   | 常用系统                  | 编译命令        |
| ------ | ------ | ------------------------- | --------------- |
| ROS 1  | ROS1   | Ubuntu 20.04 + Noetic     | `catkin_make`   |
| ROS 2  | main   | Ubuntu 22.04 + Humble     | `colcon build`  |

### 2.2 ROS 1 环境

- **Step1：安装依赖**

```bash
sudo apt install -y ros-noetic-pcl-ros libpcl-dev libboost-all-dev
```

- **Step2：克隆 FAST_LIO2_ZVISION（注意使用" -b ROS1 "分支）**

```bash
mkdir -p ~/zvision_fastlio2_ros1_ws/src 
cd ~/zvision_fastlio2_ros1_ws/src
git clone -b ROS1 https://github.com/ZVISION-lidar/FAST_LIO2_ZVISION.git
```

- **Step3： 编译 FAST_LIO2_ZVISION**

```bash
cd ~/fast_lio_ws
catkin_make -DCMAKE_BUILD_TYPE=Release
source devel/setup.bash
```

!!! note "切换到 ROS Melodic"
    如使用 ROS Melodic，请将上述安装包名（如 `ros-noetic-pcl-ros`）和环境路径中的 `noetic` 替换为 `melodic`。


### 2.3 ROS 2 环境

- **Step1：安装依赖**

```bash
sudo apt install -y ros-humble-pcl-ros ros-humble-pcl-conversions \
    ros-humble-tf2-ros libeigen3-dev libpcl-dev libboost-all-dev
```


- **Step2：克隆 FAST_LIO2_ZVISION（注意使用" -b main "分支）**

```bash
mkdir -p  ~/zvision_fastlio2_ros1_ws/src
cd ~/fast_lio_ros2_ws/src
git clone -b main https://github.com/ZVISION-lidar/FAST_LIO2_ZVISION.git
```

- **Step3： 编译 FAST_LIO2_ZVISION**

```bash
source /opt/ros/humble/setup.bash
cd ~/fast_lio_ros2_ws
colcon build  -DCMAKE_BUILD_TYPE=Release
source install/local_setup.bash
```

---

## 3. 配置与检查


### 3.1 ZVSION 驱动发布的话题

| 数据 | Topic           | 消息类型                       |
| ---- | --------------- | ------------------------------ |
| ROS1点云 | `/zvlidar_sdk/zvlidar_points_xyzirt` | `sensor_msgs/PointCloud2`      |
| ROS1 IMU  | `/zvlidar_sdk/zvlidar_imu_msg`    | `sensor_msgs/Imu`              |
| ROS2点云 | `/zvlidar_points_xyzirt` | `sensor_msgs/PointCloud2`      |
| ROS2 IMU | `/zvlidar_imu_msg` | `sensor_msgs/Imu`      |


### 3.2 FAST_LIO2_ZVISION 配置文件

根据NZ型号选择**相应配置文件** `config/zvision_nz1.yaml`、`config/zvision_nz3.yaml` 、`config/zvision_nz5.yaml`或 `config/zvision_nz5_mt.yaml`。

通常只需关注以下参数：

| 参数                              | 含义            |推荐值 |
| --------------------------------- | ----------------|----------------------- |
| `point_filter_num`                | 降采样倍数|室内建议`3` ；室外建议`4`  |
| `filter_size_surf`                | 当前帧点云体素滤波分辨率 | 室内建议`0.3`； 室外建议`0.5`  |
| `filter_size_map`                 | 全局地图体素滤波分辨率 |室内建议`0.3`； 室外建议`0.5 ` |
| `mapping.extrinsic_T / extrinsic_R` | LiDAR 到 IMU 的外参  |      默认即可          |
| `pcd_save.leaf_size`              | 保存地图时体素滤波尺寸| 根据需要设置， 如`0.1`；`0`为不滤波    |                                                

---

## 4. 运行 

### 4.1 在线运行 
根据NZ型号选择**相应启动命令** `mapping_zvision_nz*(1/3/5/5_MT)` ，以`NZ1`为例：

- **启动 ZVISION-SDK**

```bash
# ROS1
cd zvsion_ws
source devel/setup.bash
roslaunch zvision_sdk run.launch

# ROS2
cd zvsion_ws
source install/setup.bash
ros2 launch zvision_sdk run.py
```

- **启动 FASTLIO2**

```bash
# ROS1
cd ~/fast_lio_ros1_ws
source devel/setup.bash
roslaunch fast_lio mapping_zvision_nz1.launch # mapping_zvision_nz*(1/3/5/5_MT).launch

# ROS2
cd ~/fast_lio_ros2_ws
source install/setup.bash
ros2 launch fast_lio mapping_zvision_nz1.launch.py # mapping_zvision_nz*(1/3/5/5_MT).launch
```

### 4.2  离线运行

按 `4.1 在线运行` 不启动 ZVISION_SDK，直接启动 FASTLIO2 后，播放离线数据：

```bash
# ROS1
rosbag play ××××.bag  

# ROS2
ros2 bag play ××××  
```
ZVISION 提供demo数据，下载链接:

| ROS  | 仓库                                                                            |
| ---- | ------------------------------------------------------------------------------- |
| ROS1 | [ZVISION-lidar/FAST_LIO2_ZVISION](https://github.com/ZVISION-lidar/FAST_LIO2_ZVISION.git) |
| ROS2 | [ZVISION-lidar/FAST_LIO2_ZVISION](https://github.com/ZVISION-lidar/FAST_LIO2_ZVISION.git) |


运行效果：


### 4.3 保存地图

FAST-LIO2 支持三种保存 PCD 地图的方式，适用场景如下：

| 方式 | 触发时机 | 适用场景 |
| ---- | -------- | -------- |
| 方式一 | `Ctrl + C` 退出时自动保存 | 快速记录、临时测试 |
| 方式二 | `rosservice` 手动调用 | 运行时随时保存、不中断程序 |
| 方式三 | `pcd_save.interval` 间隔帧保存 | 长时间建图、定期存档 |

**方式一：退出时自动保存**

`Ctrl + C` 退出时自动保存地图，**默认目录为** `/PCD/scans.pcd/`。


**方式二：手动服务调用**

```bash
# ROS 1
rosservice call /map_save "{}"

# ROS 2
ros2 service call /map_save std_srvs/srv/Trigger "{}"
```
!!! note "保存路径" 默认 `/PCD/map.pcd`。


**方式三：interval 自动保存**

在配置文件中设置 `pcd_save.interval` 为正数 `N`，FAST-LIO2 每隔 `N` 帧自动保存一次地图到 `config/PCD/scans_N.pcd`。

!!! tip "用于重定位地图"
    用于重定位时，建议将 `pcd_save.leaf_size` 设置为 **≥ 0.2**（如 `0.2` 或 `0.5`），可显著加快后续重定位加载地图的速度。

---


## 5. 常见问题

### 5.1 FAST-LIO2 启动后没有输出

step 1： 检查 ZVSION 驱动的点云和IMU 话题存在且有数据输出。

```bash
# ROS1：
rostopic list                                       #列出所有 topic
rostopic echo /zvlidar_sdk/zvlidar_imu_msg          #检查 IMU 是否有数据输出
rostopic echo /zvlidar_sdk/zvlidar_points_xyzirt    #检查 点云 是否有数据输出

# ROS2： 
ros2 topic list                                     #列出所有 topic
ros2 topic echo /zvlidar_imu_msg                    #检查 IMU 是否有数据输出
ros2 topic echo /zvlidar_points_xyzirt              #检查 点云 是否有数据输出

```

### 5.2 PCD 地图没有保存





