# 配置说明

本章详细讲解本仓库根目录下的 `mkdocs.yml` 配置文件的每一段含义。
如果你刚开始使用 MkDocs，建议先阅读 [快速上手](quickstart.md)。

## 1. 文件位置

`mkdocs.yml` 位于仓库根目录，是 MkDocs 的唯一配置文件。
MkDocs 在执行 `mkdocs serve / build` 时会自动读取它。

## 2. 当前仓库的完整配置

```yaml
site_name: 我的Wiki文档            # 站点标题（浏览器标签、首页 H1）
site_description: 技术文档知识库     # 站点描述，写进 <meta name="description">
site_author: Administrator         # 作者，写进 <meta name="author">

theme:
  name: material                   # 使用 Material for MkDocs 主题
  language: zh                     # 全站中文界面
  palette:                         # 配色方案
    - media: "(prefers-color-scheme: light)"
      scheme: default
      primary: indigo              # 亮色模式的主色
      toggle:
        icon: material/brightness-7
        name: 切换暗色模式
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      primary: indigo
      toggle:
        icon: material/brightness-4
        name: 切换亮色模式
  features:
    - navigation.tabs              # 顶部 Tab 导航
    - navigation.sections          # 分组折叠
    - navigation.expand            # 默认展开
    - navigation.top               # "回到顶部"按钮
    - search.suggest               # 搜索建议
    - search.highlight             # 搜索词高亮
    - content.code.copy            # 代码块右上角"复制"按钮

plugins:
  - search:                        # 内置搜索插件（中文需要带 lang: zh）
      lang: zh

nav:                               # 左侧/顶部导航
  - 首页: index.md
  - 快速上手: quickstart.md
  - 配置说明: config.md

markdown_extensions:               # Markdown 扩展（让语法更强大）
  - admonition                     # !!! note/warning/tip 等彩色提示框
  - pymdownx.details               # admonition 可折叠
  - pymdownx.superfences           # 增强的代码块（支持高亮、Mermaid 等）
```

## 3. 字段逐项解释

### 3.1 站点信息

| 字段 | 说明 |
| --- | --- |
| `site_name` | 浏览器标签、首页 H1、Logo 旁文字 |
| `site_description` | SEO 描述，写进 `<meta name="description">` |
| `site_author` | SEO 作者，写进 `<meta name="author">` |
| `site_url` | **强烈建议填写**：部署到 GitHub Pages 后填写完整 URL，可让 sitemap / 社交分享正常工作 |

```yaml
site_url: https://zvision-lidar.github.io/wiki/
```

### 3.2 主题 `theme`

本仓库使用 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) 主题。
常用可选项：

- `language`: 界面语言，设为 `zh` 即显示中文菜单
- `palette`: 配色方案，支持多套（亮色 + 暗色 + 自定义）
- `features`: 功能开关，决定是否启用 Tab 导航、搜索建议、代码复制等
- `font`: 自定义字体
- `icon`: 自定义 logo / favicon

### 3.3 插件 `plugins`

| 插件 | 说明 |
| --- | --- |
| `search` | 内置全文搜索。中文务必加 `lang: zh`，否则中文分词不准确 |
| `mermaid2` | 让代码块渲染 Mermaid 流程图 / 时序图 |
| `git-revision-date-localized` | 每页底部显示"最后更新于" |
| `minify` | 压缩 HTML / CSS / JS，加快首屏 |

示例：

```yaml
plugins:
  - search:
      lang: zh
  - mermaid2
  - git-revision-date-localized:
      type: date
  - minify
```

!!! warning "插件顺序"
    插件是按列表顺序加载的；某些插件（如 `mkdocs-material` 自带的搜索）需要写在第一位，避免冲突。

### 3.4 导航 `nav`

显式声明哪些 `.md` 出现在导航中。**文件不存在时本地构建不会报错**（除非启用 `strict: true`），但线上 GitHub Pages 会 404。

支持嵌套分组：

```yaml
nav:
  - 首页: index.md
  - 快速上手: quickstart.md
  - ROS2:
      - Topic 通信: ros2/topic.md
      - Service 通信: ros2/service.md
  - 标定工具:
      - 多激光雷达外参: calibration/lidar_to_lidar.md
```

### 3.5 Markdown 扩展 `markdown_extensions`

| 扩展 | 作用 |
| --- | --- |
| `admonition` | `!!! note` 彩色提示框 |
| `pymdownx.details` | admonition 可折叠 |
| `pymdownx.superfences` | 增强代码块（高亮、行号、Mermaid） |
| `pymdownx.tabbed` | 代码块多 Tab 切换 |
| `pymdownx.highlight` | 代码高亮增强 |
| `pymdownx.inlinehilite` | 行内代码高亮 |
| `pymdownx.snippets` | 引用其他 `.md` 文件片段 |
| `pymdownx.tasklist` | `- [x]` 任务列表 |
| `toc` | 自动生成目录 |
| `tables` | GFM 表格 |
| `footnotes` | 脚注 |

推荐基础组合：

```yaml
markdown_extensions:
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.inlinehilite
  - pymdownx.tasklist:
      custom_checkbox: true
  - toc:
      permalink: true
```

## 4. 推荐的强化配置

把以下片段粘到你的 `mkdocs.yml`，站点立刻专业一倍：

```yaml
# 严格模式：发现无效链接/缺失文件时构建失败
strict: true

# 编辑按钮：每页右上角"编辑此页"
edit_uri: edit/main/docs/

# 仓库信息（顶部右上角显示仓库图标）
repo_name: zvision-lidar/wiki
repo_url: https://github.com/zvision-lidar/wiki
```

## 5. 常见问题排查

| 现象 | 原因 / 解决 |
| --- | --- |
| `WARNING - A relative path to '...' is included in the 'nav'` | `nav:` 里引用了不存在的文件，检查拼写或补文件 |
| 部署后中文搜索结果不准 | `plugins: search` 没加 `lang: zh` |
| 暗色模式主色变了 | `palette:` 中两个 `primary` 必须保持一致，否则切换时主色闪烁 |
| `mkdocs gh-deploy` 报权限错 | GitHub Actions 部署更稳：保留 `.github/workflows/main.yml`，本地不再需要手动部署 |

## 6. 参考链接

- 📘 [MkDocs 官方文档](https://www.mkdocs.org/)
- 🎨 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- 🧩 [PyMdown Extensions](https://facelessuser.github.io/pymdown-extensions/)
