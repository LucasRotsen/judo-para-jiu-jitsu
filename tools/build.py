#!/usr/bin/env python3
"""Gera as páginas <id>.html de cada técnica a partir do catálogo."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOG = [
    ("ippon-seoi-nage", "Ippon Seoi Nage"), ("o-soto-gari", "O Soto Gari"), ("o-goshi", "O Goshi"),
    ("de-ashi-barai", "De Ashi Barai"), ("tomoe-nage", "Tomoe Nage"), ("morote-gari", "Morote Gari"),
    ("tate-shiho-gatame", "Tate Shiho Gatame"), ("kami-shiho-gatame", "Kami Shiho Gatame"),
    ("sankaku-jime", "Sankaku Jime"), ("hadaka-jime", "Hadaka Jime"),
]
TPL = """<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@600;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
<div class="page" id="app"></div>
<script src="assets/engine.js"></script>
<script src="assets/engine3d.js"></script>
<script src="assets/tecnicas/{id}.js"></script>
<script>Judo.mountPage('{id}');</script>
</body>
</html>
"""
for tid, name in CATALOG:
    with open(os.path.join(ROOT, f"{tid}.html"), "w") as f:
        f.write(TPL.format(id=tid, name=name))
print("ok", len(CATALOG))
