import React, { useEffect, useState } from 'react';

const ItemDetails = ({ id, currentUser }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const fetchedItem = await fetch(`/api/items/${id}`, {
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
        },
      }).then(res => res.json());

      setItem(fetchedItem);
      setLoading(false);
    };

    fetchItem();
  }, [id, currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>Price: {item.price}</p>
      <p>Rating: {item.rating}</p>
    </div>
  );
};


export default ItemDetails;
