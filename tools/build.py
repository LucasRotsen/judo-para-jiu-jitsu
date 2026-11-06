#!/usr/bin/env python3
"""Gera site/index.html e site/<id>.html a partir do catálogo e dos arquivos de técnica."""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
BASE_URL = "https://lucasrotsen.github.io/judo-para-jiu-jitsu/"
SITE_NAME = "Judô para Jiu-Jitsu"
SITE_DESC = (
    "Técnicas de judô animadas quadro a quadro para quem treina jiu-jitsu: fases do golpe, "
    "erros comuns, segurança e o nome de cada técnica no jiu-jitsu."
)
CATALOG: list[tuple[str, str]] = [
    ("ippon-seoi-nage", "Ippon Seoi Nage"), ("o-soto-gari", "O Soto Gari"),
    ("o-goshi", "O Goshi"), ("de-ashi-barai", "De Ashi Barai"),
    ("tomoe-nage", "Tomoe Nage"), ("morote-gari", "Morote Gari"),
    ("tate-shiho-gatame", "Tate Shiho Gatame"), ("kami-shiho-gatame", "Kami Shiho Gatame"),
    ("sankaku-jime", "Sankaku Jime"), ("hadaka-jime", "Hadaka Jime"),
]
FONTS = (
    "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@600;800"
    "&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap"
)

HEAD = """<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#ECEFEA" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0F1511" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{site}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="icons/icon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{fonts}" rel="stylesheet">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
"""

SCRIPTS = '<script src="assets/engine.js"></script>\n<script src="assets/engine3d.js"></script>\n'


def head(title: str, desc: str, path: str, image: str) -> str:
    esc = {k: html.escape(v, quote=True) for k, v in
           {"title": title, "desc": desc, "url": BASE_URL + path,
            "image": BASE_URL + image, "site": SITE_NAME, "fonts": FONTS}.items()}
    return HEAD.format(**esc)


def summary_of(tid: str) -> str:
    src = (SITE / "assets" / "tecnicas" / f"{tid}.js").read_text(encoding="utf-8")
    m = re.search(r"summary:'((?:[^'\\]|\\.)*)'", src)
    if not m:
        raise SystemExit(f"{tid}: campo summary não encontrado")
    return m.group(1).replace("\\'", "'")


def technique_page(tid: str, name: str) -> str:
    title = f"{name} · {SITE_NAME}"
    return (head(title, summary_of(tid), f"{tid}.html", f"og/{tid}.png")
            + '<div class="page" id="app"></div>\n' + SCRIPTS
            + f'<script src="assets/tecnicas/{tid}.js"></script>\n'
            + f"<script>Judo.mountPage('{tid}');</script>\n</body>\n</html>\n")


def index_page() -> str:
    body = (ROOT / "tools" / "templates" / "index.body.html").read_text(encoding="utf-8")
    techs = "".join(f'<script src="assets/tecnicas/{tid}.js"></script>\n' for tid, _ in CATALOG)
    return (head(SITE_NAME, SITE_DESC, "", "og/index.png") + body + "\n" + SCRIPTS + techs
            + "<script>Judo.mountIndex();</script>\n</body>\n</html>\n")


def main() -> None:
    (SITE / "index.html").write_text(index_page(), encoding="utf-8")
    for tid, name in CATALOG:
        (SITE / f"{tid}.html").write_text(technique_page(tid, name), encoding="utf-8")
    print("ok", len(CATALOG) + 1, "páginas")


if __name__ == "__main__":
    main()
