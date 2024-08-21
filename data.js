import axios from 'axios'

const links = [
    {
        name: "Mega Filmes HD",
        link: "https://www.megafilmeshds.net/",
        division_url:"-"
    },
    {
        name: "Super Cine",
        link: "https://supercine.to/filmes/assistir-",
        division_url:"-",
        endUrl:"-online"
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

var movieLinks = []

async function linkMovies(movie){
    for (const website of links) {
        let modMovie = movie.replace(/[:]/g,"").split(' ').join(website.division_url)
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let movieLink = `${website.link}${modMovie}`;
        if (website.endUrl) {
            movieLink += website.endUrl
        };
        console.log(movieLink)
        movieLinks.push(movieLink)
    }
}

async function validLink(links){
    var responses = []
    for (const link of links) {
        try {
            await axios.get(link, { maxRedirects: 1 })
            responses.push(link)
        } catch (error) {
            responses.push(404)
        }
    }
    console.log(responses)
}

process.stdout.write('Nome do filme: ');
process.stdin.on('data', async function(data) {
    const movie = data.toString().trim().toLowerCase(); 
    await linkMovies(movie)
    await validLink(movieLinks)
    process.exit();
});


