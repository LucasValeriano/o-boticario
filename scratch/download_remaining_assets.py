import urllib.request
import os

assets = {
    "src/assets/hero-banner.png": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco/loucas/wordpress/prod/sites/1/2026/02/12002828/BLZ_loucas_fevereiro_cuide-se-bem-cereja-de-fases.png",
    "src/assets/product_11.jpg": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:eco/v1/products/B87418/o-boticario-kit-presente-dia-das-maes-lily-cuidados-3-itens.jpg"
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
