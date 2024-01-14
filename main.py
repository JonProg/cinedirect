import requests
from data import movies
from bs4 import BeautifulSoup

#response = requests.get('https://topflix.sh/filmes/assistir-online-asdgni435/')
#print(response.url) para saber se a rota gerada foi para 404

name_movie = str(input('Nome do filme'))

def movieDirect(movie:str):
    link_movie = 
    return movie.lower().replace(' ','-')

def modeSearch(movie:str):
    return '?s=' + (movie.lower().replace(' ','+'))
    
# Colocar alguma coisa para indentificar quando um rota é diferente da padrão

print(movieDirect(name_movie))