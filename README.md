# VS Code Settings Organizer

VS Code Settings Organizer is a Visual Studio Code extension that allows you to organize your VS Code settings JSON in a more readable and maintainable way.

- Organize hierarchically
- Condense structure where possible
- Sort alphabetically
- Place language-specific settings at the end of the file

## Usage

### Command

1. Open the settings JSON file in VS Code.
2. Open the command palette (Ctrl+Shift+P) and search for "Organize VS Code Settings".
3. Select the command and the extension will organize your settings.

## Before

```json
{
  "editor.tabSize": 2,
  "rust-analyzer.semanticHighlighting.punctuation.specialization.enable": true,
  "[cpp]": {
    "editor.defaultFormatter": "xaver.clang-format"
  },
  "rust-analyzer.semanticHighlighting.punctation.separate.macro.bang": true,
  "[git-commit]": {
    "editor.rulers": [
      72
    ],
    "workbench.editor.restoreViewState": false
  },
  "rust-analyzer.semanticHighlighting.punctuation.enable": true,
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "files.trimTrailingWhitespace": true,
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff",
    "editor.tabSize": 4,
    "editor.codeActionsOnSave": {
        "source.fixAll": "explicit",
      "source.organizeImports": "explicit"
    },
    "editor.formatOnSave": true,
  },
  "editor.cursorStyle": "line",
  "editor.inlineSuggest.enabled": true,
  "editor.largeFileOptimizations": false,
  "rust-analyzer.semanticHighlighting.operator.specialization.enable": true,
  "editor.lineNumbers": "on",
  "editor.minimap.enabled": false,
  "editor.semanticHighlighting.enabled": true,
  "editor.stickyScroll.enabled": true,
  "rust-analyzer.semanticHighlighting.strings.enable": false,
}
```

## After

```json
{
  "editor": {
    "cursorStyle": "line",
    "inlineSuggest.enabled": true,
    "largeFileOptimizations": false,
    "lineNumbers": "on",
    "minimap.enabled": false,
    "semanticHighlighting.enabled": true,
    "stickyScroll.enabled": true,
    "tabSize": 2
  },
  "files": {
    "insertFinalNewline": true,
    "trimFinalNewlines": true,
    "trimTrailingWhitespace": true
  },
  "rust-analyzer.semanticHighlighting": {
    "operator.specialization.enable": true,
    "punctation.separate.macro.bang": true,
    "punctuation": {
      "enable": true,
      "specialization.enable": true
    },
    "strings.enable": false
  },
  "[cpp]": {
    "editor.defaultFormatter": "xaver.clang-format"
  },
  "[git-commit]": {
    "editor.rulers": [
      72
    ],
    "workbench.editor.restoreViewState": false
  },
  "[python]": {
    "editor": {
      "codeActionsOnSave.source": {
        "fixAll": "explicit",
        "organizeImports": "explicit"
      },
      "defaultFormatter": "charliermarsh.ruff",
      "formatOnSave": true,
      "tabSize": 4
    }
  }
}
```
