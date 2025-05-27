import searchIcon from "../static/img/search.svg";

function Search () {
    return (
        <section className="search">
            <div className="categories">
                <a href="">coffee</a>
                <a href="">lego</a>
                <a href="">favorites</a>
            </div>
            <form action="" className="search-box">
                <button type="submit">
                    <img src={searchIcon} alt="search" />
                </button>
                <input type="search" placeholder="search..." />
            </form>
        </section>
    );
}
export default Search;
