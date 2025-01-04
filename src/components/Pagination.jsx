// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from "react-router-dom";

export function Pagination({ numberPage, totalPages, inputValue , genreValue}) {

    const navigate = useNavigate();

    const goToPage = (page) => {
        const query = new URLSearchParams();
        if (inputValue) query.set("movie", inputValue);
        if (genreValue) query.set("genre", genreValue);
        query.set("page", page);
        navigate(`/search?${query.toString()}`);
    };

    return (
        <div className="pagination">
            {numberPage > 1 && (
                <button
                    onClick={() => goToPage(Number(numberPage) - 1)}
                    className='page-item'
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1; // Começa da página 1, porque o índice começa em 0
                return (
                    <button 
                        key={page} 
                        onClick={() => goToPage(page)} 
                        className={`page-item ${Number(numberPage) === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                );
            })}
            {numberPage < totalPages && (
                <button
                    onClick={() => goToPage(Number(numberPage) + 1)}
                    className='page-item'
                >
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            )}
        </div>
    );
}