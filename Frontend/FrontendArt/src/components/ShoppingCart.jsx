import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import './ShoppingCart.css';
import { Button, ListGroup, Container } from 'react-bootstrap';

const ShoppingCart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    return (
        <Container className="shopping-cart-container">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ListGroup>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{item.title}</h5>
                                <p>${item.price}</p>
                            </div>
                            <Button variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};

export default ShoppingCart;
