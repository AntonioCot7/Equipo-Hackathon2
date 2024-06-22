import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Items = () => {
    const [items, setItems] = useState([]);
    const [lastKey, setLastKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Variable de estado para determinar si el usuario es admin
    const [isClient, setIsClient] = useState(false); // Variable de estado para determinar si el usuario es cliente
    const navigate = useNavigate();

    useEffect(() => {
        // Simulación de determinar si el usuario es administrador (aquí puedes usar tu lógica real)
        const checkUserStatus = () => {
            const userRole = localStorage.getItem('role'); // Suponiendo que tengas el rol del usuario en el localStorage
            console.log(userRole);
            setIsAdmin(userRole === 'admin'); // Cambia esto según tu lógica real de determinación de administrador
            setIsClient(userRole === 'client');
        };
        checkUserStatus();
    }, []);

    const fetchItems = async (limit = 5, lastKey = null) => {
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

    const handleEditItem = (asin) => {
        navigate(`/EditItems/${asin}`);
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
                        <button onClick={() => navigate(`/ItemDetails/${item.asin}`)}  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" >
                        Ver Item
                        </button>
                        {isClient && (
                            <button onClick={() => navigate('/BuyItem')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Comprar Item
                            </button>
                        )}
                        {isAdmin && (
                            <>
                                <button onClick={() => navigate('/CreateItems')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Crear Item
                                </button>
                                <button onClick={() => handleEditItem(item.asin)} className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                    Editar Item
                                </button>
                                <button onClick={() => navigate(`/DeleteItem/${item.asin}`)} className="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                    Eliminar Item
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            {loading && <p>Cargando más productos...</p>}
        </div>
    );
};