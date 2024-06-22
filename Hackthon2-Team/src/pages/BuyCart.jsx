import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const BuyCart = ({ userId }) => {
    const navigate = useNavigate();

    const handleBuyCart = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.post('https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/buy', { userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('Compra realizada con éxito');
        } catch (error) {
            console.error('Error al realizar la compra:', error);
            alert('Hubo un error al realizar la compra');
        }
    };

    return (
        <button onClick={handleBuyCart}>Comprar Carrito</button>
    );
};
