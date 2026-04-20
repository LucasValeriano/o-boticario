import urllib.request
import os

assets = [
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_1800/v1/imagens/6/campanha-cereja-de-fases-desktop.jpg", "hero.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B83321/Combo-Cereja-de-Fases.jpg", "p1.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B83322/Sabonete-Cereja-Fases.jpg", "p2.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B83323/Spray-Intimo-Cereja.jpg", "p3.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B83324/Creme-Relaxante-Cereja.jpg", "p4.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B54212/Geleia-Iluminadora-Lily.jpg", "p5.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B77432/Locao-Anti-Stress-Jasmim.jpg", "p6.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B81234/Esfoliante-Pessegura.jpg", "p7.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B82110/Serum-Retinol-Puro.jpg", "p8.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B12345/Malbec-Regular.jpg", "p9.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B54321/Egeo-Bomb-Black.jpg", "p10.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B88776/Kit-Lily-Presente.jpg", "p11.jpg"),
    ("https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B99887/Quasar-Classic.jpg", "p12.jpg")
]

os.makedirs("src/assets", exist_ok=True)

for url, filename in assets:
    try:
        path = os.path.join("src/assets", filename)
        print(f"Downloading {filename}...")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Success: {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
