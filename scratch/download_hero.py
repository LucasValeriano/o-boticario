import urllib.request
import os

url = "https://http2.mlstatic.com/D_NQ_NP_661511-MLB75841125211_042024-O.webp"
path = "src/assets/hero-banner.webp"

print(f"Downloading {url} to {path}...")
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
        out_file.write(response.read())
    print("Download successful.")
except Exception as e:
    print(f"Error: {e}")
