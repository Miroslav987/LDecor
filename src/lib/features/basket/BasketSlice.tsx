import { createAppSlice } from "@/lib/CreateAppSlice";

interface BasketState {
    basket: any; 
  }
  
  const initialState: BasketState = {
    basket: (() => {
      try {
        return JSON.parse(localStorage.getItem("basket") || "[]");
      } catch (error) {
        console.error( error);
        return [];
      }
    })(),
  };
  
  export const basketSlice = createAppSlice({
    name: "basket",
    initialState,
    reducers: {
      SetBasket: (state, action) => {
        state.basket = action.payload;
        try {
          localStorage.setItem("basket", JSON.stringify(state.basket));
        } catch (error) {
          console.error( error);
        }
      },
    },
  });
  
  export const { SetBasket } = basketSlice.actions;
  export default basketSlice.reducer;