import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AddItemToCart = ({ itemId, userId }) => {
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.put('https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/cart', { itemId, userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('Item agregado al carrito con éxito');
        } catch (error) {
            console.error('Error al agregar el item al carrito:', error);
            alert('Hubo un error al agregar el item al carrito');
        }
    };

    return (
        <button onClick={handleAddToCart}>Agregar al Carrito</button>
    );
};

