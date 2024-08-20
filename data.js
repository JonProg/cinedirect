import axios from 'axios'

const links = [
    {
        name: "Mega Filmes HD",
        link: "https://www.megafilmeshds.net/",
        division_url:"-"
    },
    {
        name: "Mega Filmes Gratis HD",
        link: "https://megafilmesgratishd.com/filme/assistir-",
        division_url:"-",
        endUrl:"-dublado-online-hdd"
    },
    {
        name: "Topflix",
        link: "https://topflix.vc/filmes/assistir-online-",
        division_url:"-"
    },
    {
        name: "Topflix",
        link: "https://megacine.to/filmes/assistir-",
        division_url:"-",
        endUrl:"-online"
    },
]

var movieLinks = []

async function linkMovies(filme){
    for (const website of links) {
        let movieLink = `${website.link}${filme.split(' ').join(website.division_url)}`;
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
        const response = await axios.get(link)
        responses.push(response.status)
    }
    console.log(responses)
}

process.stdout.write('Nome do filme: ');
process.stdin.on('data', async function(data) {
    const filme = data.toString().trim().toLowerCase(); 
    await linkMovies(filme)
    await validLink(movieLinks)
    process.exit();
});


