#!/usr/bin/env python3
"""Construit tools/out/demo.html : l'appli + les données d'exemple (prototype/capture/demo-data.js),
injectées avant le script de l'appli. Usage : python3 tools/build-demo.py"""
from pathlib import Path
root = Path(__file__).resolve().parent.parent
app = (root / 'index.html').read_text(encoding='utf-8')
demo = (root / 'prototype/capture/demo-data.js').read_text(encoding='utf-8')
i = app.index('<script>')
out = root / 'tools/out/demo.html'
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(app[:i] + '<script>\n' + demo + '\n</script>\n' + app[i:], encoding='utf-8')
print('OK', out)
