import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFavorites } from "../components/Product/useFavorites";
import { useCart } from "../context/useCart";

function Favorites() {
    const { favorites, loading, error, toggleFavorite } = useFavorites();
    const { addToCart} = useCart();
    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error.message}</p>;

    return (
        <>
            <Header />
            <main>
                <div className="Favorites-list">
                    {favorites.map((product) => {
                        const isFavorite = favorites.some(fav => fav.id === product.id);
                        return (
                            <div key={product.id} className="Favorites-item">
                                <img src={product.image} alt={product.name} />
                                <div className="Favorites-info">
                                    <h2 className="Favorites-title">{product.name}</h2>
                                    <button
                                        className="icon-2"
                                        onClick={() => toggleFavorite(product.id)}
                                    >
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill={isFavorite ? "red" : "none"}
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                            2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 
                                            3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
                                            3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>
                                    <button onClick={() => addToCart(product)} className="cart">
                                        <svg
                                        width="32"
                                        height="28"
                                        viewBox="0 0 20 20"
                                        fill="black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path d="M14.875 13.3777L17.3225 1.81716H20V0H16.1525L15.5756 2.7252L0 2.71176L1.65592 13.3777H14.875ZM15.191 4.54204L13.7051 11.5606H2.9063L1.81486 4.5305L15.191 4.54204Z" />
                                        <path d="M12.8136 20C14.1419 20 15.2225 18.6963 15.2225 17.094C15.2225 15.4917 14.1419 14.1881 12.8136 14.1881H3.73798C2.40973 14.1881 1.3291 15.4917 1.3291 17.094C1.3291 18.6963 2.40971 20 3.73798 20C5.06625 20 6.14684 18.6963 6.14684 17.094C6.14684 16.7092 6.08435 16.3417 5.97124 16.0053H10.5803C10.4672 16.3417 10.4047 16.7092 10.4047 17.094C10.4048 18.6963 11.4854 20 12.8136 20ZM4.64051 17.094C4.64051 17.6944 4.23564 18.1828 3.73798 18.1828C3.24032 18.1828 2.83543 17.6944 2.83543 17.094C2.83543 16.4937 3.24029 16.0053 3.73798 16.0053C4.23564 16.0053 4.64051 16.4937 4.64051 17.094ZM13.7162 17.094C13.7162 17.6944 13.3113 18.1828 12.8136 18.1828C12.316 18.1828 11.9111 17.6944 11.9111 17.094C11.9111 16.4937 12.316 16.0053 12.8136 16.0053C13.3113 16.0053 13.7162 16.4937 13.7162 17.094Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Favorites;
