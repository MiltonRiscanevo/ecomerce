export const initialState={
    basket:[],
    user: null,
    shippingData: {}
}

export const actionTypes={
    ADD_TO_BASKET:"ADD_TO_BASKET",
    REMOVE_ITEM:"REMOVE_ITEM",
    SET_USER: "SET_USER",
    EMPTY_BASKET:"EMPTY_BASKET",
    SET_SHIPPINGDATA:"SET_SHIPPINGDATA"
}

export const getBasketTotal = (basket) =>
    basket.map(el=>parseInt(el.price)).reduce((prev, curr)=>prev + curr,0)

const reducer=(state, action)=>{
    console.log(action);

    switch (action.type) {
        case "ADD_TO_BASKET":
            return{
                ...state,
                basket:[...state.basket, action.item]
            }
        case "REMOVE_ITEM":
            const index = state.basket.findIndex((basketItem => basketItem.id === action.id))
            let newBasket = [...state.basket]

            if(index>=0){
                newBasket.splice(index,1)
            }else {console.log("Can't remove product")}

            return{
                ...state,
                basket: newBasket,
            }
        case "SET_USER":
            return {
                ...state,
                user:action.user
            }
            default: return state;
        case "EMPTY_BASKET":
            return{
                ...state,
                basket: action.basket
            }
        case "SET_SHIPPINGDATA":
            return{
                ...state,
                shippingData: action.shippingData
            }

    } 
}

export default reducer