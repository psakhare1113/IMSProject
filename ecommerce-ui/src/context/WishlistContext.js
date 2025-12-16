import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const saveWishlist = (items) => {
    setWishlist(items);
    localStorage.setItem('wishlist', JSON.stringify(items));
  };

  const addToWishlist = (product) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setPendingAction({ type: 'wishlist', product });
      return false;
    }
    if (!wishlist.find(item => item.id === product.id)) {
      saveWishlist([...wishlist, product]);
    }
    return true;
  };

  const removeFromWishlist = (productId) => {
    saveWishlist(wishlist.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const executePendingAction = () => {
    if (pendingAction) {
      if (pendingAction.type === 'wishlist') {
        addToWishlist(pendingAction.product);
      }
      setPendingAction(null);
    }
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      pendingAction,
      executePendingAction
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
