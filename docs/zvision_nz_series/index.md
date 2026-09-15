# ZVISION NZ 系列

> 留形科技（ZVISION）面向具身智能和自动移动机器人的全场景空间感知与记忆产品

本系列页汇总 ZVISION Wiki 中涉及 NZ 系列产品和 Odin 系列的所有文档。选择一个入口开始：

---

## 产品文档

### [Odin1 — 空间记忆模组](odin1/index.md)

!!! info "迁移状态：资源待补齐"
    Odin1 文档已从 Jekyll 站点迁移至本 MkDocs 站，**图片/PDF/3D 数模资源正在补齐中**。
    当前可正常阅读全部文字内容和章节结构。

深度融合 LiDAR + 视觉 + SLAM 算法的空间记忆模组，提供厘米级全局定位与高频位姿输出。

| 维度 | 详细规格 |
|:---|:---|
| **超高性能空间感知** | 70m / 30m 双档测距 · 120°×90° 视场角 · 70 万点/秒 |
| **超鲁棒空间记忆** | ±5cm+1% 全局定位 · 400Hz 位姿更新 · 复杂环境自适应 |
| **小巧全能工业设计** | 280g · 100×62×43mm · IP66 · 12-24V · 抗 32G 冲击 |

👉 [进入 Odin1 用户手册 →](odin1/index.md){ .md-button }

---

## 通用前置要求

| 工具 | 版本要求 |
| --- | --- |
| Python | >= 3.9 |
| pip | 最新版 |
| Git | 最新版 |

!!! tip "国内用户加速"
    使用清华源安装 MkDocs：
    ```bash
    pip install -i https://pypi.tuna.tsinghua.edu.cn/simple mkdocs mkdocs-material
    ```

## 下一步

- 📖 阅读 [配置说明](../config.md)，了解 `mkdocs.yml` 的全部可选项
- 🎨 按需在 `mkdocs.yml` 启用更多扩展（Mermaid 图表、数学公式、代码高亮等）
- 🚀 推送 `main` 分支即可一键部署，无需手动 `gh-deploy`
