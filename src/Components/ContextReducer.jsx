import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();
const CartDispatchContext = createContext(); // 👈 Capital C

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((c) => c.id !== action.payload.id);
      case "CLEAR_CART":
  return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}> {/* 👈 Capital C */}
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
