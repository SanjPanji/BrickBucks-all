import Header from "./components/Header";
import "../src/static/style.css";
import Home from "./pages/Home";
import CoffeeCategories from "./pages/CoffeeCategories";
import Invincible from "./pages/Invincible";
import GiftCard from "./pages/GiftCard";
import Sustainability from "./pages/Sustainability";
import LegoCategories from "./pages/LegoCategories";
import SubCoffeeCtg from "./pages/CoffeeSubCtg";
import CoffeeOrder from "./pages/CoffeeOrder";
import LegoSubCtg from "./pages/LegoSubCtg";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import JoinNow from "./pages/JoinNow";
import SignIn from "./pages/SignIn";
import AppRouter from "./components/AppRouter";


function App() {
  return (
    <AppRouter />
  );
}

export default App;
