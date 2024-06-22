import React, { useEffect, useState } from 'react';

const CartDetails = ({ userId, currentUser }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (currentUser.role !== 'client') {
          throw new Error('Acceso denegado. Se requiere rol de cliente.');
        }

        const response = await fetch(`/cart/${userId}`, {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el carrito');
        }

        const cartData = await response.json();
        setCartItems(cartData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, currentUser]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.itemId}>
              Item ID: {item.itemId}, Cantidad: {item.qty}
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default CartDetails;