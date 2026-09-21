# ZVISION Wiki Git 操作手册

> **适用仓库**：<https://github.com/ZVISION-lidar/wiki.git>（公开仓库）
> **部署方式**：push `main` → GitHub Actions 自动构建 → `mkdocs gh-deploy` 推送 `gh-pages` 分支上线

---

## 目录

- [1. 仓库分支模型](#1-仓库分支模型)
- [2. 项目结构](#2-项目结构)
- [3. 首次克隆仓库](#3-首次克隆仓库)
- [4. 安装 MkDocs 及依赖](#4-安装-mkdocs-及依赖)
- [5. 单次改动完整流程（4 个阶段）](#5-单次改动完整流程4-个阶段)
- [6. 验证发布是否成功](#6-验证发布是否成功)
- [7. 任务完成后清理](#7-任务完成后清理)
- [8. 多人协作注意事项](#8-多人协作注意事项)
- [9. 常见情况和恢复操作](#9-常见情况和恢复操作)
- [10. 不要做的事](#10-不要做的事)
- [11. 速查表](#11-速查表)
- [12. 完整示例：改一个 typo 的全过程](#12-完整示例改一个-typo-的全过程)

---

## 1. 仓库分支模型

| 分支 | 用途 | 是否触发 GitHub Pages 构建 |
|---|---|---|
| `main` | 线上发布分支 | ✅ 触发，push 后 1–3 分钟生效 |
| `zvision_develop` | 集成分支，所有功能分支合并到这里 | ❌ 不触发 |
| `feature/<名字>` | 个人功能分支，基于 `zvision_develop` 创建 | ❌ 不触发 |

**核心规则：**

- ❌ **永远不要直接在 `main` 上 commit**
- ❌ **永远不要直接在 `zvision_develop` 上 commit**
- ✅ 改动流程：从 `zvision_develop` 拉 `feature/<名字>` → 在 feature 上改 → push → 合并到 `zvision_develop` → 测试稳定后从 `zvision_develop` 发布到 `main`

---

## 2. 项目结构

```
wiki/
├── mkdocs.yml          ← 站点配置文件（导航、主题、插件）
├── docs/               ← 所有文档源文件（Markdown + 资源）
│   ├── index.md        ← 首页
│   ├── config.md
│   ├── GIT_WORKFLOW.md ← 本手册
│   ├── zvision_nz_series/
│   │   ├── index.md
│   │   └── NZ1/
│   │       ├── 01-产品概述.md
│   │       ├── 02-硬件说明.md
│   │       └── ...
│   └── stylesheets/
│       └── extra.css   ← 自定义 CSS
└── site/               ← mkdocs build 生成的静态站点（无需上传 git）
```

!!! note "关于 site/ 目录"
    `site/` 是 `mkdocs build` 的输出目录，已在 `.gitignore` 中忽略，不会被提交。
    实际部署由 GitHub Actions 执行 `mkdocs gh-deploy`，自动构建并推送到 `gh-pages` 分支。

---

## 3. 首次克隆仓库

如果你还没有本地副本，先克隆并切到集成分支：

```powershell
git clone https://github.com/ZVISION-lidar/wiki.git
cd wiki
git switch zvision_develop
```

!!! note "关于本地目录名"
    不写本地目录名时，Git 默认用仓库名 `wiki` 作为文件夹名。
    后续所有命令都在 `wiki/` 目录下执行。

---

## 4. 安装 MkDocs 及依赖

本地预览是必须的，先装好 MkDocs。

### 4.1 检查 Python

```powershell
python --version
```

如果没有，去 <https://www.python.org/downloads/> 下载安装，安装时**勾选 "Add Python to PATH"**。

### 4.2 安装 MkDocs 与 Material 主题

```powershell
pip install mkdocs mkdocs-material
```

### 4.3 关于插件

`mkdocs.yml` 里用到的插件（如 `pymdownx`、`minify`、`git-revision-date-localized`、`mermaid2` 等）会在 `mkdocs serve` 首次运行时**自动安装**，无需手动 `pip install`。

### 4.4 验证安装

```powershell
mkdocs --version
```

如果提示 `mkdocs` 命令找不到，改用：

```powershell
python -m mkdocs --version
```

---

## 5. 单次改动完整流程（4 个阶段）

### 阶段 A：开始任务前，同步 zvision_develop 并建自己的功能分支

```powershell
# 1. 切到 zvision_develop
cd wiki
git switch zvision_develop

# 2. 同步远端最新 zvision_develop
git pull origin zvision_develop

# 3. 基于 zvision_develop 建自己的功能分支
#    分支名建议：feature/<姓名-功能>，如 feature/tzy-fix-nz1-slam
git switch -c feature/tzy-fix-nz1-slam
```

### 阶段 B：在功能分支上改文档并提交

```powershell
# 1. 用任意编辑器（如 VS Code）打开 docs/ 下的文件进行修改

# 2. 修改后必须本地预览。在 wiki 目录下运行：
mkdocs serve
#    浏览器打开 http://127.0.0.1:8000 实时预览，改文件会自动刷新
#    如果 mkdocs 命令找不到，改用：
#    python -m mkdocs serve
#    如果端口 8000 被占用，指定其他端口：
#    mkdocs serve -a 127.0.0.1:8001

# 3. 查看改动
git status              # 列出修改 / 新增 / 删除的文件
git diff                # 查看具体行级改动
git diff --stat         # 只看每个文件改了几行

# 4. 提交
git add -A
git commit -m "docs(<模块>): 一句话描述这次改了什么"
# 示例：git commit -m "docs(SLAM/fastlio2): 增加使用说明"
```

### 阶段 C：推送功能分支并合并到 zvision_develop

```powershell
# 1. 推到远端
git push origin feature/tzy-fix-nz1-slam

# 2. 合并到 zvision_develop（必须用 --no-ff）
git switch zvision_develop
git merge --no-ff feature/tzy-fix-nz1-slam -m "Merge: <一句话描述>"

# 3. 推送到远端
git push origin zvision_develop
```

!!! warning "必须用 --no-ff"
    创建 merge commit，这样 `main` 的历史里能清楚看到每次合入的功能。

### 阶段 D：定期发布——把 zvision_develop 合并到 main 触发上线

!!! note "什么时候发布？"
    攒了一批改动、测试通过后，由维护者定期（按需，比如每天 / 每周 / 发布节点）从 `zvision_develop` 发布到 `main`。
    日常单次改动不需要走这一步。

```powershell
# 1. 切到 main
git switch main

# 2. 同步远端 main（避免漏掉别人发布的内容）
git pull origin main

# 3. 合并 zvision_develop 到 main（必须用 --no-ff）
git merge --no-ff zvision_develop -m "Release: <一句话>"

# 4. 推送到远端，触发 Pages 构建
git push origin main

# 5. 切回 zvision_develop 继续工作
git switch zvision_develop
```

!!! warning "必须用 --no-ff"
    创建 merge commit，让 `main` 历史里能看到每次发布的合并节点，避免 fast-forward 失败。

---

## 6. 验证发布是否成功

push `main` 后 1–3 分钟，访问下面链接并刷新（**Ctrl+F5 强刷新**避开浏览器缓存）：

- 🔗 <https://zvision-lidar.github.io/wiki/>

也可以在 GitHub 仓库页 → **Actions** 标签查看构建是否成功（绿勾 ✅ = 已上线）。

---

## 7. 任务完成后清理

```powershell
# 1. 切回 zvision_develop（确保在 zvision_develop 上）
git switch zvision_develop

# 2. 删除本地功能分支
git branch -d feature/tzy-fix-nz1-slam

# 3. 删除远端功能分支（可选，合并后可以顺手删掉）
git push origin --delete feature/tzy-fix-nz1-slam

# 4. 开始下一个任务
git pull origin zvision_develop
git switch -c feature/tzy-add-faq
```

---

## 8. 多人协作注意事项

| 场景 | 做法 |
|---|---|
| 每次新任务 | 先 `git switch zvision_develop && git pull` 再新建 `feature/<名字>` |
| 多人同时改同一文件 | 先协商或错开时间，或拆成不同功能分支 |
| 提交后发现还有问题 | 直接再 commit + push 覆盖 |
| 功能分支合并有冲突 | 在本地 rebase 到最新 `zvision_develop`，解决冲突后用 `git push --force-with-lease`（比 `-f` 安全，若远端已被别人更新会拒绝推送） |

---

## 9. 常见情况和恢复操作

### 9.1 改错了，还没 commit，想撤销

```bash
git status                           # 看哪些文件被改了
git restore <文件路径>               # 撤销单个文件
git restore .                        # 撤销当前目录所有改动（慎用！）
```

### 9.2 已经 commit，但还没 push，想撤销最后一次 commit

```bash
git reset --soft HEAD~1              # 撤销 commit，改动保留在暂存区
# 或
git reset HEAD~1                     # 撤销 commit，改动保留在工作区（更常用）
```

### 9.3 已经 push 到功能分支，想撤销

修改后再 commit + push 一次即可。
不要用 `git push -f`，除非确认没人在用这个分支。

### 9.4 已经 merge 到 zvision_develop 了，想撤销

**最安全的做法**：新开一个 feature 分支修复，或者在 `zvision_develop` 上直接 commit 修复。
**不要**用 `git reset` + `git push -f zvision_develop`，会破坏历史。

### 9.5 已经发布到 main 了，发现内容不对

**最安全的做法**：重新改一遍 → 走完整流程修复 → 等下次发布到 `main`。
**不要**用 `git reset` + `git push -f main`，会破坏历史。

### 9.6 `git merge --no-ff zvision_develop` 发布到 main 时报冲突

正常情况下不会发生，因为 `main` 应该是 `zvision_develop` 的子集。如果真发生，多半是 `main` 上意外有了别的提交（有人违反了「不在 main 上直接 commit」的规则）：

```bash
git status                           # 看冲突文件
# 手动编辑冲突文件，删掉 <<<<<<< / ======= / >>>>>>> 标记
git add <冲突文件>
git commit                           # 完成合并
git push origin main
```

冲突复杂搞不定就找维护者帮忙。

### 9.7 合并功能分支时有冲突

```bash
# 切到你的功能分支
git switch feature/tzy-fix-nz1-slam

# rebase 到最新 zvision_develop
git fetch origin
git rebase origin/zvision_develop
```

手动解决冲突后（删掉 `<<<<<<<` / `=======` / `>>>>>>>` 标记），继续：

```bash
git add <冲突文件>
git rebase --continue
git push --force-with-lease origin feature/tzy-fix-nz1-slam
```

---

## 10. 不要做的事

- ❌ 在 `main` 上直接 commit（必须通过 `zvision_develop` 合并过去）
- ❌ 在 `zvision_develop` 上直接 commit（必须通过 feature 分支合并进去）
- ❌ `git push -f`（强制推送，会覆盖远端历史）
- ❌ `git reset --hard` 后立刻 `git push -f`
- ❌ 多人同时在同一个 feature 分支上工作（每人用自己分支）

---

## 11. 速查表

| 想做什么 | 命令 |
|---|---|
| 安装 MkDocs | `pip install mkdocs mkdocs-material` |
| 同步 zvision_develop | `git switch zvision_develop && git pull origin zvision_develop` |
| 新建功能分支 | `git switch -c feature/<名字>` |
| 切换分支 | `git switch <分支名>` |
| 当前是哪个分支 | `git branch --show-current` |
| 看当前改了什么 | `git status` |
| 看具体行级改动 | `git diff` |
| 看简要改动统计 | `git diff --stat` |
| 提交 | `git add -A && git commit -m "..."` |
| 推送到远端 | `git push origin <分支名>` |
| 删除本地分支 | `git branch -d <分支名>` |
| 删除远端分支 | `git push origin --delete <分支名>` |
| 发布到 main | `git switch main && git pull && git merge --no-ff zvision_develop && git push` |
| 拉取远端最新 | `git pull origin <分支>` |
| 本地预览网站 | `mkdocs serve` |

---

## 12. 完整示例：改一个 typo 的全过程

假设要把 `01-产品概述.md` 里「NZ1 系列」改成「NZ1 系列产品」：

```powershell
# 阶段 A：建功能分支
cd wiki
git switch zvision_develop
git pull origin zvision_develop
git switch -c feature/tzy-fix-nz1-title

# 阶段 B：改文档 + 本地预览 + 提交
# 用 VS Code 编辑 docs/zvision_nz_series/NZ1/01-产品概述.md
mkdocs serve                # 浏览器打开 http://127.0.0.1:8000 预览
git diff
git add -A
git commit -m "docs(NZ1): fix typo in product overview"

# 阶段 C：推到远端 + 合并到 zvision_develop
git push origin feature/tzy-fix-nz1-title
git switch zvision_develop
git merge --no-ff feature/tzy-fix-nz1-title -m "Merge: fix nz1 title typo"
git push origin zvision_develop

# 阶段 D（定期发布时由维护者执行）：发布到 main
git switch main
git pull origin main
git merge --no-ff zvision_develop -m "Release: typo fix in NZ1 product overview"
git push origin main
git switch zvision_develop

# 1–3 分钟后访问 https://zvision-lidar.github.io/wiki/ 验证（Ctrl+F5）

# 清理
git branch -d feature/tzy-fix-nz1-title
git push origin --delete feature/tzy-fix-nz1-title
```