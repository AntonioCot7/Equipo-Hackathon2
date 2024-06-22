import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RemoveFromCart = ({ itemId, userId }) => {
    const navigate = useNavigate();

    const handleRemoveFromCart = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete('https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/cart', {
                data: { itemId, userId },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('Item eliminado del carrito con éxito');
        } catch (error) {
            console.error('Error al eliminar el item del carrito:', error);
            alert('Hubo un error al eliminar el item del carrito');
        }
    };

    return (
        <button onClick={handleRemoveFromCart}>Eliminar del Carrito</button>
    );
};

