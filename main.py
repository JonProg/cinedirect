import requests
from bs4 import BeautifulSoup

response = requests.get('https://topflix.sh/filmes/assistir-online-asdgni435/ ')
print(response.url)