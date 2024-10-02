import axios from 'axios'

const links = [
    {
        name: "Mega Filmes HD",
        link: "https://www.megafilmeshds.net/",
        division_url:"-",
    },
    {
        name: "Super Filmes",
        link: "https://superfilmes.bio/filmes/assistir-online-",
        division_url:"-",
    },
    {
        name: "Topflix",
        link: "https://topflix.vc/filmes/assistir-online-",
        division_url:"-"
    },
    {
        name: "Super Flix",
        link: "https://superflix.dev/filme/",
        division_url:"-",
    },
    {
        name: "Night Series",
        link: "https://thenightseries.live/filme/",
        division_url:"-",
    },
];


class LRUCache {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.cache = new Map(); 
    }

    get(key) {
        if (!this.cache.has(key)) return null;
        const value = this.cache.get(key);
        this.cache.delete(key); 
        this.cache.set(key, value);
        return value;
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key); 
        } else if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

const lruCache = new LRUCache(100); 

function formatMovieTitle(movie, division_url) {
    return movie.toLowerCase()
        .replace(/'/g, ' rsquo ')
        .replace(/[:!]/g, "")
        .split(' ')
        .join(division_url)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

async function linkMovies(movie){
    var movieLinks = {};
    
    for (const website of links) {
        let modMovie = formatMovieTitle(movie, website.division_url);
        let movieLink = `${website.link}${modMovie}`;
        if (website.endUrl) {
            movieLink += website.endUrl
        };
        movieLinks[website.name] = `${movieLink}`
    }
    return movieLinks
}

export async function validLink(movieTitle){
    
    if (lruCache.get(movieTitle)) {
        return lruCache.get(movieTitle);
    }

    const response = await linkMovies(movieTitle);
    const validLinks = {}

    const promises = Object.entries(response).map(async ([name, url]) => {
        try {
            await axios.get(url, {timeout: 2700, maxRedirects: 2 });
            validLinks[name] = url;
        } catch (error) {
            console.error(`Erro ao verificar o link para ${name}:`, error.message);
        }
    });
    
    await Promise.all(promises);
    lruCache.set(movieTitle, validLinks);

    return Object.keys(validLinks).length > 0 ? validLinks : null;
}
