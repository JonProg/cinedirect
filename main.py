import requests
from data import movies
from bs4 import BeautifulSoup

response = requests.get('https://topflix.sh/filmes/assistir-online-asdgni435/')
#print(response.url) para saber se a rota gerada foi para 404

#saber se no body da pagina tem <ul> caso tenha significa que tem filme

name_movie = str(input('Nome do filme:'))

def validLink(link): # Para saber se a rota gerada foi 404
    pass

def movieDirect(movie:str):
    links = []
    for link in movies:
        mod_movie = movie.lower().strip().replace(' ',link['division_url'])
        movie_route = link['link'] + mod_movie
        response = requests.get(movie_route)
        links.append([movie_route,response.status_code])
    return links

    
# Colocar alguma coisa para indentificar quando um rota é diferente da padrão

print(movieDirect(name_movie))

