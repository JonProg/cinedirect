import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = new URLSearchParams();
        query.set("movie", searchValue);
        navigate(`/search?${query.toString()}`);
    };

    return (
        <div className={`search ${scrolled ? "search-scrolled" : ""}`}>
            <a id="title-web" href="/">
                Cine<span>Direct</span>
            </a>

            <form onSubmit={handleSubmit} method="get" className="search-form">
                <div id="input-group">
                    <i className="fa-solid fa-magnifying-glass lupa-icon"></i>
                    <input
                        type="text"
                        name="movie"
                        placeholder="Pesquise seu filme..."
                        value={searchValue}
                        onChange={handleInputChange}
                        minLength="4"
                        id="movieInput"
                    />
                    <button id="searchButton" type="submit">
                        Buscar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Search;