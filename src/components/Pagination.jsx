/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export function Pagination({ numberPage, totalPages, inputValue, genreValue }) {
    const navigate = useNavigate();
    const current = Number(numberPage);

    const goToPage = (page) => {
        const query = new URLSearchParams();
        if (inputValue) query.set("movie", inputValue);
        if (genreValue) query.set("genre", genreValue);
        query.set("page", page);
        navigate(`/search?${query.toString()}`);
    };

    const getPageNumbers = () => {
        const pages = [];
        const delta = 1;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= current - delta && i <= current + delta)
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== "...") {
                pages.push("...");
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                onClick={() => goToPage(current - 1)}
                className="page-item nav-item"
                disabled={current <= 1}
                aria-label="Página anterior"
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span key={`dots-${index}`} className="page-dots">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`page-item ${current === page ? "active" : ""}`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => goToPage(current + 1)}
                className="page-item nav-item"
                disabled={current >= totalPages}
                aria-label="Próxima página"
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}