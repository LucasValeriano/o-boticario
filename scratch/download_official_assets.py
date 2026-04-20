import urllib.request
import os

assets = {
    "src/assets/hero-banner.webp": "https://images.tcdn.com.br/img/img_prod/1241437/o_boticrio_cuide_se_bem_cereja_de_fases_1_20260219180228_9c9355df0817.jpg",
    "src/assets/product_1.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/product/B2026020321/31e6da30-051e-40a6-a870-278c91f044ef-b2026020321.jpg",
    "src/assets/product_2.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/product/B85679/8348f0c7-dba7-45a6-a1d5-b6a9cad3b296-bot-85679-cuide-se-cereja-de-fases-sabonete-barra-01.jpg",
    "src/assets/product_3.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/product/B88913/2eedf996-70f8-48ff-b996-1822cfb6dd68-bot-88913-cuide-se-bem-cereja-de-fases-spray-intimo-01.jpg",
    "src/assets/product_4.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/product/B85675/da0474ba-e6af-4319-996b-af7ae849a73a-bot-85675-cuide-se-bem-cereja-de-fases-creme-relaxante-01.jpg",
    "src/assets/product_5.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/product/B57537/0ed53b38-a648-47de-b48e-352c121447fe-bot-33427-lily-geleia-iluminadora-frontal-01.jpg",
    "src/assets/product_6.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/products/B82045/Locao-Hid-Anti-stress-Nativa-SPA-Jasmim-Sambac-400ml-B82045_.jpg",
    "src/assets/product_7.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/product/B57046/a4d8108f-ab49-4f13-8580-67d29b61ab89-bot-57046-cuide-se-bem-docura-na-pessegura-esfoliante-frontal-01.jpg",
    "src/assets/product_8.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/products/B83550/BOTIK-SRUM-RETINOL-PURO-30ml_B83550_.jpg",
    "src/assets/product_9.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/product/B84387/3fcf35bd-e85f-416e-bbbb-755c89f39e95-bot-84387-malbec-malbec-desodorante-colonia-frontal-01.jpg",
    "src/assets/product_10.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/products/B82685/Egeo-Des-Col-Bomb-Black-C-Car-90Ml-B82685_.jpg",
    "src/assets/product_11.jpg": "https://m.media-amazon.com/images/I/51y17WexYVL._AC_UF1000,1000_QL80_.jpg",
    "src/assets/product_12.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/imagens/product/B51243/5a9f04af-88a5-4c5d-9f7b-7fdb4d7d839d-bot-51243-quasar-classic-colonia-frontal-01.jpg",
    "src/assets/hero-mobile.webp": "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3829697358548944807",
    "src/assets/pix-logo.png": "https://logospng.org/download/pix/logo-pix-1024.png"
}




os.makedirs("src/assets", exist_ok=True)

for path, url in assets.items():
    print(f"Downloading {url} to {path}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
            out_file.write(response.read())
        print("Download successful.")
    except Exception as e:
        print(f"Error downloading {url}: {e}")
