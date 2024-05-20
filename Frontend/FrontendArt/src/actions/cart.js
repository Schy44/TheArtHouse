// 1. Check Action Dispatch
const handleBuy = () => {
    console.log('Buy button clicked'); // Add this line
    addToCart(artwork); // Add item to cart
    history.push('/shopping-cart'); // Redirect to shopping cart page
};

// 2. Verify Reducer (in your reducer file)
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            console.log('Item added to cart:', action.payload); // Add this line
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        // Other cases...
        default:
            return state;
    }
};

// 3. Check Component Props (inside ArtworkDetails component)
console.log('Props received:', { addItemToCart }); // Add this line

// 4. Button Click (inside ArtworkDetails component)
const handleBuy = () => {
    console.log('Buy button clicked'); // Add this line
    addToCart(artwork); // Add item to cart
    history.push('/shopping-cart'); // Redirect to shopping cart page
};
