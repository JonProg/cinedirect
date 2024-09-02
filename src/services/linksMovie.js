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
    let response = await linkMovies(movieTitle);
    for (const link in response) {
        try {
            await axios.get(response[link], { maxRedirects: 1 });
        } catch (error) {
            delete response[link]
        }
    }
    if (response=={}) {
        return null
    }
    return response;
}
