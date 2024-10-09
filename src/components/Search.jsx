import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search(){
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState();

    // Função que lida com a mudança de texto no input
    const handleInputChange = (e) => {
        setSearchValue(e.target.value); // Atualiza o estado com o valor digitado
    };

    // Função que lida com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        const query = new URLSearchParams();
        query.set("movie",searchValue);
        navigate(`/search?${query.toString()}`);
    };

    return(
        <>
            <div class="search">
                <a id="title-web" href="/">CineDirect</a>
                <form onSubmit={handleSubmit} method="get" class="search-form">
                    <div id="input-group">
                        <input type="text" name="movie" 
                        placeholder="Pesquise seu filme..."
                        value={searchValue}
                        onChange={handleInputChange}
                        minlength="4" id="movieInput"/>
                        <button id="searchButton" type="submit">
                            <i class="fa-solid fa-magnifying-glass lupa"></i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Search