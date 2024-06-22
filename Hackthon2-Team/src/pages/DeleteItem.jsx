import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const DeleteItem = () => {
    const [itemId, setItemId] = useState('');
    const navigate = useNavigate();

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/item/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('Item eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar el item:', error);
            alert('Hubo un error al eliminar el item');
        }
    };

    return (
        <div>
            <h2>Eliminar Producto</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
                <div>
                    <label>ID del Producto:</label>
                    <input type="text" value={itemId} onChange={(e) => setItemId(e.target.value)} required />
                </div>
                <button type="submit">Eliminar Producto</button>
            </form>
        </div>
    );
};

