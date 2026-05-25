#!/bin/bash
set -e

# ═══════════════════════════════════════════════
# craftHTML — Installer
# Make your AI output fit for reading
# ═══════════════════════════════════════════════

REPO="Winter-FF/craftHTML"
BRANCH="main"
BASE_URL="https://raw.githubusercontent.com/$REPO/$BRANCH"
VERSION="1.0.0"

# Colors
R='\033[31m'  # Red
G='\033[32m'  # Green
Y='\033[33m'  # Yellow
B='\033[34m'  # Blue
C='\033[36m'  # Cyan
D='\033[90m'  # Dim gray
BOLD='\033[1m'
RST='\033[0m'

# Icons (fallback-safe for terminals)
TICK="${G}✓${RST}"
CROSS="${R}✗${RST}"
ARROW="${C}→${RST}"
STAR="${Y}★${RST}"

SKILLS=("html" "html-map")
MODULES=(
  "tokens.css" "layout.css" "typography.css" "prose.css" "components.css"
  "interactive.css" "interactive.js"
  "sidebar.html" "theme-toggle.html" "google-fonts.html"
)
declare -A EXTRA_MODULES
EXTRA_MODULES[html-map]="map-components.css"

# ─── Helpers ───

banner() {
  echo ""
  echo -e "  ${C}${BOLD}craftHTML${RST}  ${D}v${VERSION}${RST}"
  echo -e "  ${D}Make your AI output fit for reading${RST}"
  echo ""
}

info()  { echo -e "  ${D}$1${RST}"; }
ok()    { echo -e "  ${TICK} ${G}$1${RST}"; }
fail()  { echo -e "  ${CROSS} ${R}$1${RST}"; }
warn()  { echo -e "  ${STAR} ${Y}$1${RST}"; }

download() {
  local url="$1" dest="$2"
  local dir
  dir=$(dirname "$dest")
  mkdir -p "$dir"
  if curl -sSfL "$url" -o "$dest" 2>/dev/null; then
    return 0
  else
    return 1
  fi
}

file_size() {
  if command -v wc &>/dev/null; then
    wc -c < "$1" 2>/dev/null | tr -d ' '
  else
    ls -la "$1" 2>/dev/null | awk '{print $5}'
  fi
}

# ─── Install ───

do_install() {
  local target="$1"
  local total=0
  local errors=0
  local size=0

  for skill in "${SKILLS[@]}"; do
    echo -e "\n  ${BOLD}$(echo "$skill" | sed 's/-/ /g')${RST}"
    echo -e "  ${D}─${RST}"

    # SKILL.md
    if download "$BASE_URL/skills/$skill/SKILL.md" "$target/$skill/SKILL.md"; then
      ok "$skill/SKILL.md"
      ((total++))
      size=$((size + $(file_size "$target/$skill/SKILL.md" || echo 0)))
    else
      fail "$skill/SKILL.md"
      ((errors++))
    fi

    # Assets
    for m in "${MODULES[@]}"; do
      if download "$BASE_URL/skills/$skill/assets/$m" "$target/$skill/assets/$m"; then
        ok "$skill/assets/$m"
        ((total++))
        size=$((size + $(file_size "$target/$skill/assets/$m" || echo 0)))
      else
        fail "$skill/assets/$m"
        ((errors++))
      fi
    done

    # Extra modules per skill
    if [ -n "${EXTRA_MODULES[$skill]}" ]; then
      for m in ${EXTRA_MODULES[$skill]}; do
        if download "$BASE_URL/skills/$skill/assets/$m" "$target/$skill/assets/$m"; then
          ok "$skill/assets/$m"
          ((total++))
          size=$((size + $(file_size "$target/$skill/assets/$m" || echo 0)))
        else
          fail "$skill/assets/$m"
          ((errors++))
        fi
      done
    fi
  done

  echo ""

  if [ "$errors" -gt 0 ]; then
    warn "$errors file(s) failed. Check your network and retry."
    exit 1
  fi

  # Summary
  local size_kb=$((size / 1024))
  echo -e "  ${G}${BOLD}Installed${RST}  ${total} files (${size_kb}KB)"
  echo -e "  ${D}Location${RST}   ${target}"
  echo -e "  ${D}Version${RST}    ${VERSION}"
  echo ""
  echo -e "  ${BOLD}Next steps:${RST}"
  echo -e "  ${ARROW} Restart Claude Code"
  echo -e "  ${ARROW} ${C}/html document.md${RST}   convert to HTML"
  echo -e "  ${ARROW} ${C}/html-map${RST}          visualize project"
  echo ""
}

# ─── Uninstall ───

do_uninstall() {
  local found=0
  for dir in ".claude/skills" "$HOME/.claude/skills"; do
    if [ -d "$dir/html" ] && [ -f "$dir/html/SKILL.md" ]; then
      rm -rf "$dir/html" "$dir/html-map"
      ok "Removed from ${dir}"
      found=1
    fi
  done
  if [ "$found" -eq 0 ]; then
    info "Nothing to uninstall. craftHTML not found."
  else
    echo ""
    info "Restart Claude Code to complete removal."
  fi
}

# ─── Help ───

show_help() {
  echo ""
  echo -e "  ${C}${BOLD}craftHTML${RST}  ${D}v${VERSION}${RST}"
  echo -e "  ${D}Make your AI output fit for reading${RST}"
  echo ""
  echo -e "  ${BOLD}Usage:${RST}"
  echo "    ./install.sh              Install to project (.claude/skills/)"
  echo "    ./install.sh --global     Install globally (~/.claude/skills/)"
  echo "    ./install.sh --uninstall  Remove craftHTML"
  echo "    ./install.sh --help       Show this help"
  echo ""
  echo -e "  ${BOLD}Recommended:${RST}"
  echo "    npx skills add Winter-FF/craftHTML"
  echo ""
}

# ─── Main ───

case "${1:-}" in
  --help|-h)
    show_help
    exit 0
    ;;
  --uninstall|-u)
    banner
    do_uninstall
    exit 0
    ;;
  --global|-g)
    banner
    TARGET="${HOME}/.claude/skills"
    info "Installing globally..."
    do_install "$TARGET"
    ;;
  "")
    banner
    TARGET=".claude/skills"
    info "Installing to project..."
    do_install "$TARGET"
    ;;
  *)
    fail "Unknown option: $1"
    echo "  Run with --help for usage."
    exit 1
    ;;
esac
