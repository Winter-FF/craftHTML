<p align="center">
  <img src="assets/logo.png" alt="craftHTML" width="120">
</p>

<h1 align="center">craftHTML Skill</h1>

<p align="center">
  <strong><em>让 AI 的产出，适合你读完</em></strong>
</p>

<p align="center"><em>
  一个让 Agent 将一切转换成出版级 HTML 的轻量 Skill<br>
  零依赖，自适应
</em></p>

<p align="center">
  <a href="README.md">English</a> · <a href="#快速开始">快速开始</a> · <a href="#功能展示">功能展示</a>
</p>

## 它做什么

| Skill | 用途 |
|---|---|
| **`/html`** | 文档 → HTML。自动识别文档类型和语言，匹配最佳阅读架构。 |
| **`/html-map`** | 项目 → HTML。自动扫描代码仓库，生成可视化的架构、依赖、关键文件、阅读路径。 |

## 快速开始

### 安装

**方式一 — 一行命令（推荐）：**

```bash
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/install.sh | bash
```

**方式二 — 全局安装（所有项目可用）：**

```bash
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/install.sh | bash -s -- --global
```

**方式三 — 手动安装：**

```bash
mkdir -p .claude/commands
curl -sSfO https://raw.githubusercontent.com/Winter-FF/craftHTML/main/skills/html.md
curl -sSfO https://raw.githubusercontent.com/Winter-FF/craftHTML/main/skills/html-map.md
mv html.md html-map.md .claude/commands/
```

### 使用

安装后重启 Claude Code，然后：

```
/html document.md               → 转换为 HTML
/html-map                       → 可视化当前项目
```

就这样。无需配置，无需安装依赖。

## 功能展示

### `/html`

将任意 Markdown 文档转化为设计精致的 HTML 页面。自动检测文档类型、语言和书写系统，匹配最佳信息架构。

```bash
/html my-spec.md              → 自动检测语言和类型
/html design-doc.md --lang zh → 指定输出语言（英文文档 → 中文 HTML）
/html output.html --lang en   → 对已有 HTML 换语言（中文 → 英文）
/html output.html "标题换成衬线体" → 增量调整（只改指定部分，无需重新生成）
```

### `/html-map`

扫描整个代码仓库，生成一页全景地图——从"这是什么"到"怎么改它"，一个页面看完。

```bash
/html-map                    → 扫描当前项目
/html-map path/to/project    → 扫描指定目录
/html-map --lang zh          → 中文描述
/html-map --deep             → 深度分析（import 关系 + git 活跃度）
/html-map --quick            → 仅做清单扫描（不分析模块）
```

## 呈现效果

每份文档都值得精心呈现。`/html` 会根据文档类型自动选择最佳结构和视觉方案。

**克制的配色** — 暖纸色系，不刺眼，适合长时间阅读

**模式切换** — 浅色模式如暖纸文档，深色模式为暖墨色调，均经过完整调色验证

**层次分明的排版** — 侧栏目录 + 正文标题，保证可读性

**智能信息架构** — 美化 + 重新组织：

| 文档类型 | 结构方式 |
|---|---|
| 规格文档 | 侧栏导航 + 可折叠章节 |
| 代码审查 | 按严重程度排序 |
| 研究报告 | 摘要在最前面 |
| 方案对比 | 选项并排展示 |
| 教程指南 | 渐进式展开 |
| 数据看板 | KPI 卡片 + 趋势图 |
| …… | 其它扩展 |

**全球语言适配** — 从内容自动检测语言，支持 CJK、Latin、RTL、Cyrillic 四大书写系统，每种都有对应的排版规则。

**交互组件** — 深浅色切换、代码块复制、侧栏导航、章节跳转光晕，每个 HTML 都自带。

## 项目结构

```
craftHTML/
├── skills/
│   ├── html.md          ← /html（文档转换）
│   └── html-map.md      ← /html-map（项目全景地图）
├── README.md            ← 英文文档
├── README.zh.md         ← 本文件
├── CHANGELOG.md
├── CONTRIBUTING.md
├── install.sh           ← 一键安装脚本
└── examples/            ← Before / After 示例
```

## 卸载

```bash
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/install.sh | bash -s -- --uninstall
```

或手动删除 `.claude/commands/html.md` 和 `.claude/commands/html-map.md`。

## 贡献

见 [CONTRIBUTING.md](CONTRIBUTING.md)
