// src/components/EditItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';

export const EditItems = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [stars, setStars] = useState(0);
    const [imgUrl, setImgUrl] = useState('');
    const [boughtInLastMonth, setBoughtInLastMonth] = useState(0);
    const [isBestSeller, setIsBestSeller] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/items/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const item = response.data;
                setItem(item);
                setBoughtInLastMonth(item.boughtInLastMonth);
                setImgUrl(item.imgUrl);
                setIsBestSeller(item.isBestSeller);
                setPrice(item.price);
                setStars(item.stars);
                setTitle(item.title);
            } catch (error) {
                console.error('Error al obtener el item:', error);
                alert('Hubo un error al obtener el item');
            }
        };

        fetchItem();
    }, [id]);

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');

        const updatedItem = {
            itemId: id,
            boughtInLastMonth,
            imgUrl,
            isBestSeller,
            price,
            stars,
            title,
        };

        try {
            const response = await axios.put('https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/items', updatedItem, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('Item editado con éxito');
            history.push('/admin'); // Redirige a la vista de admin después de editar el item
        } catch (error) {
            console.error('Error al editar el item:', error);
            alert('Hubo un error al editar el item');
        }
    };

    if (!item) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Editar Producto</h2>
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
                <button type="submit">Editar Producto</button>
            </form>
        </div>
    );
};
