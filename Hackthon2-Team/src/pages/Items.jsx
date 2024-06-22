import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AddItemToCart } from './AddItemToCart';


export const Items = () => {
    const [items, setItems] = useState([]);
    const [lastKey, setLastKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

     const [userId, setUserId] = useState(null);

     const getUserIdFromToken = () => {
         const token = localStorage.getItem('token');
         if (token) {
             try {
                 // Decodificar el token para obtener la información
                 const decodedToken = jwt_decode(token);
                 // Asignar el userId desde el token decodificado
                 setUserId(decodedToken.userId);
             } catch (error) {
                 console.error('Error al decodificar el token:', error);
             }
         }
     };

    const fetchItems = async (limit = 10, lastKey = null) => {
        setLoading(true);
        try {
            const response = await axios.get('https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/items', {
                params: {
                    limit,
                    lastKey,
                },
            });

            setItems(prevItems => [...prevItems, ...response.data.items]);
            setLastKey(response.data.lastKey);
        } catch (error) {
            console.error('Error al obtener los items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserIdFromToken();
        fetchItems();
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
            return;
        }
        fetchItems(10, lastKey);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastKey, loading]);

    const handleAddToCart = (itemId) => {
        navigate(`/AddItemCart/${itemId}`); // Navegar a la página de detalles del item
    };

    return (
        <div>
            <h2>Lista de Productos</h2>
            <div>
                {items.map(item => (
                    <div key={item.itemId}>
                        <img src={item.imgUrl} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>Precio: ${item.price}</p>
                        <p>Puntuación: {item.stars}</p>
                        <AddItemToCart itemId={item.itemId} userId="123Z" />
                        <button onClick={() => navigate(`/ItemDetails/${item.itemId}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Ver Detalles
                        </button>
                    </div>
                ))}
            </div>
            {loading && <p>Cargando más productos...</p>}
        </div>
    );
};