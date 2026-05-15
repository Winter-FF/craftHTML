#!/bin/bash
set -e

REPO="Winter-FF/craftHTML"
BRANCH="main"
BASE_URL="https://raw.githubusercontent.com/$REPO/$BRANCH"

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

install_files() {
  local target="$1"
  echo -e "${CYAN}craftHTML${NC} → installing to ${target}"

  mkdir -p "$target"

  if curl -sSf "$BASE_URL/skills/html.md" -o "$target/html.md" && \
     curl -sSf "$BASE_URL/skills/html-map.md" -o "$target/html-map.md"; then
    echo -e "${GREEN}✓${NC} html.md"
    echo -e "${GREEN}✓${NC} html-map.md"
    echo ""
    echo -e "${GREEN}Done.${NC} Restart Claude Code, then try:"
    echo -e "  ${CYAN}/html document.md${NC}"
    echo -e "  ${CYAN}/html-map${NC}"
  else
    echo -e "${RED}Error:${NC} download failed. Check your internet connection."
    rm -f "$target/html.md" "$target/html-map.md"
    exit 1
  fi
}

echo ""
echo -e "${CYAN}craftHTML${NC} — Make your AI output fit for reading"
echo ""

if [ "$1" = "--global" ] || [ "$1" = "-g" ]; then
  TARGET="${HOME}/.claude/commands"
elif [ "$1" = "--uninstall" ] || [ "$1" = "-u" ]; then
  TARGET=""
  for dir in ".claude/commands" "$HOME/.claude/commands"; do
    if [ -f "$dir/html.md" ] && grep -q "craftHTML\|everythingHTML\|/html Design System" "$dir/html.md" 2>/dev/null; then
      rm -f "$dir/html.md" "$dir/html-map.md"
      echo -e "${GREEN}✓${NC} Removed from $dir"
      TARGET="done"
    fi
  done
  if [ "$TARGET" != "done" ]; then
    echo "craftHTML not found. Nothing to uninstall."
  fi
  exit 0
elif [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
  echo "Usage:"
  echo "  ./install.sh              Install to current project (.claude/commands/)"
  echo "  ./install.sh --global     Install globally (~/.claude/commands/)"
  echo "  ./install.sh --uninstall  Remove craftHTML skills"
  exit 0
else
  TARGET=".claude/commands"
fi

install_files "$TARGET"
