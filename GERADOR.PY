import json
import os

# Carrega os dados do catálogo
with open('catalogo.json', 'r', encoding='utf-8') as f:
    dados = json.load(f)

# Organiza os álbuns por artista
artistas = {}
for item in dados:
    artista = item['artista']
    artistas.setdefault(artista, []).append(item)

# Template HTML para cada página de artista
template = """
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>{artista} – Discografia | Arquivo Sonoro</title>
  <meta name="description" content="Discografia de {artista} com links para download via MEGA. Parte do acervo do projeto cultural Arquivo Sonoro.">
  <meta name="keywords" content="{artista}, discografia, álbuns, música, download, MEGA, Arquivo Sonoro">
  <meta name="author" content="Felipe">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://arquivosonoro.netlify.app/{slug}.html">
  <style>
    body {{
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      color: #333;
    }}
    h1, h2 {{
      text-align: center;
    }}
    ul {{
      list-style: none;
      padding: 0;
    }}
    li {{
      margin-bottom: 15px;
    }}
    a {{
      color: #0066cc;
      text-decoration: none;
    }}
    a:hover {{
      text-decoration: underline;
    }}
    footer {{
      margin-top