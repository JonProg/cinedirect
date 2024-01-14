import requests
from bs4 import BeautifulSoup

#response = requests.get('https://topflix.sh/filmes/assistir-online-asdgni435/ ')
#print(response.url) para saber se a rota gerada foi para 404

name_movie = 'Tempos Modernos'

def modeDirect(movie:str):
    return movie.lower().replace(' ','-')

print(modeDirect(name_movie))

def modeSearch(movie:str):
    return '?s=' + (movie.lower().replace(' ','+'))
    
# Colocar alguma coisa para indentificar quando um rota é diferente da padrão