import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';


export const ItemDetails = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      try {
        const response = await axios.get(`https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/item/${id}`, { 
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const item = response.data;
        setItem(item);
  
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Item no encontrado</div>;
  }

  return (
    <div>
       <img src={item.imgUrl} alt={item.title} />
        <h3>{item.title}</h3>
        <p>Precio: ${item.price}</p>
        <p>Puntuación: {item.stars}</p>
        <p>BestSeller: {item.isBestSeller}</p>
        <p>Se ha comprado el último mes: {item.boughtInLastMonth}</p>
    </div>
  );
};