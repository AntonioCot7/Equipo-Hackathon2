import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AddItemToCart } from './AddItemToCart';


export const AdminDashboard = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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


    return (
        <div>
            <h2>Panel de Administración</h2>
            <button onClick={() => navigate('/CreateItems')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                                    Crear Item
                                    </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4">Cargando productos...</td>
                        </tr>
                    ) : (
                        items.map(product => (
                            <tr key={product.itemId}>
                                <td>{product.itemId}</td>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button onClick={() => navigate(`/ItemDetails/${item.asin}`)}  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" >
                                    Ver Item
                                    </button>
                                    <button onClick={() => navigate(`/EditItems/${item.asin}`)}  className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" >
                                    Editar Item
                                    </button>
                                    <button onClick={() => navigate(`/DeleteItem/${item.asin}`)}  className="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" >
                                    Delete Item
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};