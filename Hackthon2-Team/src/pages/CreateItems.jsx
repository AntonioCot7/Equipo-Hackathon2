import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateItems = () => {
    const [boughtInLastMonth, setBoughtInLastMonth] = useState(0);
    const [imgUrl, setImgUrl] = useState('');
    const [isBestSeller, setIsBestSeller] = useState(false);
    const [price, setPrice] = useState('');
    const [stars, setStars] = useState(0);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 

        const newItem = {
            title,
            price,
            stars,
            imgUrl,
            boughtInLastMonth,
            isBestSeller,
        };

        try {
            const response = await axios.post('https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/items', newItem, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('Item creado con éxito');
            navigate('/admin'); // Redirige a la vista de admin después de crear el item
        } catch (error) {
            console.error('Error al crear el item:', error);
            alert('Hubo un error al crear el item');
        }
    };

    return (
        <div>
            <h2>Agregar Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del producto:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Precio:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Puntuación:</label>
                    <input type="number" value={stars} onChange={(e) => setStars(e.target.value)} min="0" max="5" required />
                </div>
                <div>
                    <label>URL de la imagen:</label>
                    <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} required />
                </div>
                <div>
                    <label>Compras en el último mes:</label>
                    <input type="number" value={boughtInLastMonth} onChange={(e) => setBoughtInLastMonth(e.target.value)} required />
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={isBestSeller} onChange={(e) => setIsBestSeller(e.target.checked)} />
                        Es un best seller
                    </label>
                </div>
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};

