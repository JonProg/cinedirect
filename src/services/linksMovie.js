import axios from 'axios'

const links = [
    {
        name: "Mega Filmes HD",
        link: "https://www.megafilmeshds.net/",
        division_url:"-"
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
        name: "Minha Serie",
        link: "https://minhaserie.net/filme/",
        division_url:"-",
    },
    {
        name: "Ultra Flix",
        link: "https://ultraflix.lat/filme/",
        division_url:"-",
    },
];

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
    const response = await linkMovies(movieTitle);
    const validLinks = {}

    const promises = Object.entries(response).map(async ([name, url]) => {
        try {
            await axios.get(url, { maxRedirects: 1 });
            validLinks[name] = url;
        } catch (error) {
            console.error(`Erro ao verificar o link para ${name}:`, error.message);
        }
    });
    
    await Promise.all(promises);

    return Object.keys(validLinks).length > 0 ? validLinks : null;
}
