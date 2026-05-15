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

### 一行安装（全平台通用）

```bash
npx skills add Winter-FF/craftHTML
```

自动检测已安装的 AI 工具（Claude Code、Codex、Cursor、Copilot、Gemini CLI 等），安装 `/html` 和 `/html-map` 两个技能。

### 平台专属用法

**Claude Code：**

```
/html document.md               → 转换为 HTML
/html-map                       → 可视化当前项目
```

**Codex（OpenAI）：**

```
$html document.md        → 转换为 HTML
$html-map                → 可视化当前项目
```

**其他工具（Cursor、Windsurf 等）：**

设计系统模块是独立的 CSS/HTML/JS 文件，在项目规则中引用即可。见下方 [其他 AI 工具](#其他-ai-工具)。

### 备选方案：install.sh

```bash
# 项目级
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/scripts/install.sh | bash

# 全局
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/scripts/install.sh | bash -s -- --global
```

### 其他 AI 工具

设计系统模块（`skills/html/assets/`）是独立的 CSS/HTML/JS 文件，可在任何工具中使用：

**Cursor / Windsurf / VS Code Copilot：**

将 `skills/html/SKILL.md` 的内容粘贴到项目的规则文件中（如 `.cursorrules`、`.windsurfrules`），然后在指令中引用 `skills/html/assets/` 中的 CSS 文件。

**任何可访问文件的 Agent：**

告诉 Agent：*"读取 `skills/html/assets/` 中的文件，将它们作为设计系统使用。遵循 `skills/html/SKILL.md` 中的规则。"*

> **说明：** `/html` 和 `/html-map` 斜杠命令是 Claude Code 的自定义命令。其他工具使用相同的设计系统，但调用方式可能不同（作为项目规则、上下文文件或内联指令）。

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
│   ├── html/                ← /html 技能（SKILL.md + assets/）
│   └── html-map/            ← /html-map 技能（SKILL.md + assets/）
├── scripts/
│   └── install.sh           ← 备选安装脚本
├── README.md
├── README.zh.md             ← 本文件
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
└── assets/logo.png
```

## 卸载

```bash
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/scripts/install.sh | bash -s -- --uninstall
```

或手动删除 `.claude/commands/html.md` 和 `.claude/commands/html-map.md`。

## 贡献

见 [CONTRIBUTING.md](CONTRIBUTING.md)
