# Kaiyi Huang · 黄开艺

个人学术主页，基于 Next.js、React 和 PRISM，支持中英文切换、论文视频预览、Google Scholar 引用数及 GitHub stars。

## 本地预览

需要 Node.js 22、npm；指标更新和静态预览使用 Python 3。

```sh
npm ci
npm run dev
```

打开 http://localhost:3000。

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

构建结果输出到 `out/`，`npm start` 在 http://localhost:3000 预览该目录。

## 内容维护

| 内容 | 文件 |
| --- | --- |
| 个人信息、社交账号、头像、导航 | `content/config.toml` |
| About、News、奖项、教学和服务 | `content/` |
| 中文内容 | `content_zh/`，未覆盖的配置继承英文版本 |
| 论文及首页展示顺序 | `content/publications.bib` 的 `selected` / `selectedorder` |
| 论文演示素材 | `public/papers/` |
| 当前头像 | `public/bio-illustration-v6.png` |
| 指标来源配置 | `content/publication-metrics.json` |
| 指标快照 | `src/data/publicationMetrics.json` |

更新引用数和 stars：

```sh
python3 scripts/update_publication_metrics.py
```

来源暂时不可访问时保留上次成功的数据。详细说明见 [research-metrics.md](docs/research-metrics.md)。

## Git 与部署

这是一个独立本地仓库，没有继承上游仓库历史。根据提供的账号，本地 `origin` 预设为：

```text
https://github.com/Karine-Huang/Karine-Huang.github.io.git
```

仓库名采用 [GitHub Pages 个人主页的标准命名](https://docs.github.com/en/pages/quickstart)，对应网站地址为 `https://karine-huang.github.io/`。目前仅完成本地配置，尚未创建远端仓库或 push。

检查通过后，先确认该账号下已准备好同名仓库。如果新建，保持远端为空（不要自动添加 README、许可证或 .gitignore），再推送本地提交：

```sh
git remote -v
git push -u origin main
```

如果使用其他仓库地址，可先运行 `git remote set-url origin <你的仓库URL>`。

当前网站使用域名根路径；如部署到 `username.github.io/repository/` 子路径，需要先调整资源路径和 Next.js 的 `basePath`。

GitHub Pages 工作流保留手动触发和每天北京时间 08:20 的定时更新。推送触发当前关闭；需在 GitHub 仓库的 Pages 设置中选择 GitHub Actions，并按需启用工作流的 `push` 配置。定时工作流在默认分支上运行。

## 来源

基于 [PRISM](https://github.com/xyjoey/PRISM) 修改，保留其 [MIT 许可证](LICENSE) 和页面署名。仓库包含当前页面所需的源码和素材；不包含 CV、头像试稿、依赖目录、本地工具环境或构建产物。
