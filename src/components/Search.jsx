import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState(''); 


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
        <>
            <div className="search">
                <a id="title-web" href="/">CineDirect</a>
                <form onSubmit={handleSubmit} method="get" className="search-form">
                    <div id="input-group">
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
                            <i className="fa-solid fa-magnifying-glass lupa"></i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Search;
