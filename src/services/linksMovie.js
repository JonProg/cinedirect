import axios from 'axios'

const links = [
    {
        name: "Mega Filmes HD",
        link: "https://www.megafilmeshds.net/",
        division_url:"-"
    },
    {
        name: "Super Cine",
        link: "https://supercine.to/filmes/",
        division_url:"-",
    },
    {
        name: "Topflix",
        link: "https://topflix.vc/filmes/assistir-online-",
        division_url:"-"
    },
    {
        name: "Mega Cine",
        link: "https://megacine.to/filmes/assistir-",
        division_url:"-",
        endUrl:"-online"
    },
]

async function linkMovies(movie){
    var movieLinks = [];
    
    for (const website of links) {
        let modMovie = movie.replace(/[:]/g,"").split(' ').join(website.division_url)
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let movieLink = `${website.link}${modMovie}`;
        if (website.endUrl) {
            movieLink += website.endUrl
        };
        movieLinks.push(movieLink);
    }
    return movieLinks
}

export async function validLink(movieTitle){
    var responses = await linkMovies(movieTitle);
    for (const [index,link] of responses.entries()) {
        try {
            await axios.get(link, { maxRedirects: 0 });
        } catch (error) {
            responses.splice(index , 1);
        }
    }
    return responses;
}
