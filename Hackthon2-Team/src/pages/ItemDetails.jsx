import React, { useEffect, useState } from 'react';

export const ItemDetails = ({ id, currentUser }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/item/${id}`, { 
          headers: {
            'Authorization': `Bearer ${currentUser.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el item');
        }

        const fetchedItem = await response.json();

        if (!fetchedItem || fetchedItem.ansi !== id) { 
          throw new Error('Item no encontrado');
        }

        setItem(fetchedItem);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, currentUser]);

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
      <h1>{item.name}</h1>
      {/* Otros detalles del item aquí */}
    </div>
  );
};
