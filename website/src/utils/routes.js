import {
    HOME,
    COFFEE_CATEGORIES,
    COFFEE_SUBCATEGORY,
    COFFEE_ORDER,
    LEGO_CATEGORIES,
    LEGO_SUBCATEGORY,
    FAVORITES,
    CART,
    SIGN_IN,
    JOIN_NOW,
    GIFT_CARD,
    SUSTAINABILITY,
    INVINCIBLE
} from "./consts";

import Home from "../pages/Home";
import CoffeeCategories from "../pages/CoffeeCategories";
import Invincible from "../pages/Invincible";
import GiftCard from "../pages/GiftCard";
import Sustainability from "../pages/Sustainability";
import LegoCategories from "../pages/LegoCategories";
import CoffeeOrder from "../pages/CoffeeOrder";
import LegoSubCtg from "../pages/LegoSubCtg";
import Cart from "../pages/Cart";
import Favorites from "../pages/Favorites";
import JoinNow from "../pages/JoinNow";
import SignIn from "../pages/SignIn";
import CoffeeSubCtg from "../pages/CoffeeSubCtg";

export const routes = [
  {
    path: HOME,
    element: <Home />
  },
  {
    path: COFFEE_CATEGORIES,
    element: <CoffeeCategories />
  },
  {
    path: COFFEE_SUBCATEGORY,
    element: <CoffeeSubCtg />
  },
  {
    path: COFFEE_ORDER,
    element: <CoffeeOrder />
  },
  {
    path: LEGO_CATEGORIES,
    element: <LegoCategories />
  },
  {
    path: LEGO_SUBCATEGORY,
    element: <LegoSubCtg />
  },
  {
    path: FAVORITES,
    element: <Favorites />
  },
  {
    path: CART,
    element: <Cart />
  },
  {
    path: SIGN_IN,
    element: <SignIn />
  },
  {
    path: JOIN_NOW,
    element: <JoinNow />
  },
  {
    path: GIFT_CARD,
    element: <GiftCard />
  },
  {
    path: SUSTAINABILITY,
    element: <Sustainability />
  },
  {
    path: INVINCIBLE,
    element: <Invincible />
  }
];
