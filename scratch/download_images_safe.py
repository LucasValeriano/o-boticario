import urllib.request
import os

images = {
    "src/assets/combo-cereja.webp": "https://http2.mlstatic.com/D_NQ_NP_966314-MLB107398493884_032026-O.webp",
    "src/assets/sabonete-cereja.webp": "https://http2.mlstatic.com/D_NQ_NP_798861-MLB108697249063_032026-O.webp",
    "src/assets/spray-cereja.webp": "https://http2.mlstatic.com/D_NQ_NP_606110-MLA108657617465_032026-O.webp",
    "src/assets/creme-cereja.webp": "https://http2.mlstatic.com/D_NQ_NP_699131-MLB108657617465_032026-O.webp",
    "src/assets/lily-glow.webp": "https://http2.mlstatic.com/D_NQ_NP_918512-MLB78310023450_082024-O.webp",
    "src/assets/jasmim-sambac.webp": "https://http2.mlstatic.com/D_NQ_NP_779313-MLA496262410332_082024-O.webp",
    "src/assets/esfoliante-pessego.webp": "https://http2.mlstatic.com/D_NQ_NP_745912-MLB78310023450_082024-O.webp",
    "src/assets/botik-retinol.webp": "https://http2.mlstatic.com/D_NQ_NP_964512-MLB52187653450_102022-O.webp",
    "src/assets/malbec.webp": "https://http2.mlstatic.com/D_NQ_NP_941014-MLB52187653450_102022-O.webp",
    "src/assets/egeo-bomb.webp": "https://http2.mlstatic.com/D_NQ_NP_900609-MLB78342410332_082024-O.webp",
    "src/assets/kit-lily.webp": "https://http2.mlstatic.com/D_NQ_NP_756512-MLB52187653450_102022-O.webp",
    "src/assets/quasar.webp": "https://http2.mlstatic.com/D_NQ_NP_943512-MLB52187653450_102022-O.webp",
    "src/assets/hero-banner.jpg": "https://res.cloudinary.com/lovable-all-stars/image/upload/v1733350170/boticario/hero-banner.jpg"
}

os.makedirs("src/assets", exist_ok=True)

for path, url in images.items():
    print(f"Downloading {url} to {path}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
            out_file.write(response.read())
        print("Download successful.")
    except Exception as e:
        print(f"Error: {e}")
