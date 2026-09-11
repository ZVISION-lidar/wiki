# 快速上手

本章节帮助你在 **5 分钟内** 把本 Wiki 跑起来，并熟悉最常用的工作流。

## 1. 环境准备

本 Wiki 基于 [MkDocs](https://www.mkdocs.org/) + [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) 构建，需要：

| 工具 | 推荐版本 | 说明 |
| --- | --- | --- |
| Python | >= 3.9 | 用于安装 MkDocs 与插件 |
| pip | 最新版 | `python -m pip install --upgrade pip` |
| Git | 最新版 | 推送触发 GitHub Actions 自动部署 |

!!! tip "国内用户加速"
    可临时使用清华源安装依赖：
    ```bash
    pip install -i https://pypi.tuna.tsinghua.edu.cn/simple mkdocs mkdocs-material
    ```

## 2. 本地安装

```bash
# 克隆仓库
git clone https://github.com/zvision-lidar/wiki.git
cd wiki

# 安装依赖
pip install -r requirements.txt   # 如果仓库提供了该文件
# 或直接安装
pip install mkdocs mkdocs-material
```

> 如果你不想污染全局环境，可以自行用 `python -m venv .venv`，本 Wiki 不强制要求虚拟环境。

## 3. 本地预览

```bash
mkdocs serve
```

启动后会看到类似输出：

```
INFO    -  Building documentation...
INFO    -  Documentation built in X.XX seconds
INFO    -  Serving on http://127.0.0.1:8000/wiki/
```

打开浏览器访问 [http://127.0.0.1:8000/wiki/](http://127.0.0.1:8000/wiki/) 即可实时预览。
**修改 `docs/*.md` 后浏览器会自动刷新**，无需手动重启。

## 4. 常用命令速查

| 命令 | 作用 |
| --- | --- |
| `mkdocs serve` | 启动本地实时预览服务器（默认 8000 端口） |
| `mkdocs build` | 在 `site/` 目录生成静态站点 |
| `mkdocs gh-deploy --force` | 手动把 `site/` 推送到 `gh-pages` 分支 |
| `mkdocs new [dir]` | 新建一个 MkDocs 项目（脚手架） |
| `mkdocs -h` | 查看全部子命令帮助 |

!!! warning "端口被占用"
    启动报 `Address already in use` 时，可换端口：
    ```bash
    mkdocs serve -a 127.0.0.1:8765
    ```

## 5. 新增 / 修改文档

1. 在 `docs/` 下新建或编辑 `.md` 文件，例如 `docs/ros2/topic.md`。
2. 若新增页面，记得在根目录的 `mkdocs.yml` 的 `nav:` 中登记，否则它不会出现在左侧导航。
3. 本地 `mkdocs serve` 实时查看效果。
4. 提交并推送到 `main` 分支 → GitHub Actions 会自动构建并部署到 GitHub Pages。

```bash
git add .
git commit -m "docs: 新增 ROS2 Topic 章节"
git push origin main
```

## 6. 项目结构一览

```
my_wiki/
├── mkdocs.yml        # 站点配置（导航、主题、插件）
├── docs/             # 所有 Markdown 源文件
│   ├── index.md      # 首页
│   ├── quickstart.md # 本页
│   └── config.md     # 配置说明
├── .github/
│   └── workflows/
│       └── main.yml  # GitHub Actions 自动部署脚本
├── site/             # mkdocs build 产物（已加入 .gitignore）
└── .gitignore
```

## 7. 下一步

- 📖 阅读 [配置说明](config.md)，了解 `mkdocs.yml` 的全部可选项
- 🎨 想要更丰富的主题特性（Tab 切换、Mermaid 图表、数学公式等），按需在 `mkdocs.yml` 启用对应扩展
- 🚀 推送 `main` 分支即可一键部署，无需手动 `gh-deploy`
