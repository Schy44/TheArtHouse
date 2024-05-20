// ArtworkDetailsPage.jsx

import React from 'react';
import ArtworkDetails from './ArtworkDetails'; // Import your ArtworkDetails component
import { addToCart } from '../actions/cart'; // Import the addToCart action
import { connect } from 'react-redux';

const ArtworkDetailsPage = ({ addToCart }) => {
    const handleBuy = () => {
        console.log('Buy button clicked');
        // Dispatch the addToCart action here
        addToCart(); // This should dispatch the addToCart action
    };

    return (
        <div>
            <ArtworkDetails handleBuy={handleBuy} />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addToCart: () => dispatch(addToCart()),
});

export default connect(null, mapDispatchToProps)(ArtworkDetailsPage);
