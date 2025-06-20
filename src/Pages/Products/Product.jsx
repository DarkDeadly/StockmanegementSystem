import React, { useEffect, useRef, useState } from 'react';
import Header from '../../Component/header/Header';
import ProductAdd from '../../Component/ProductComponents/ProductAdd';
import './product.css';
import { Input, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductTable from '../../Component/ProductComponents/ProductTable';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../util/firebase';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';

const Product = () => {
  const [IsAdmin, setIsAdmin] = useState(false);
  const [Products, setProducts] = useState([]);
  const [Search, setSearch] = useState("");

  const FilterProducts = Products.filter(product =>
    product.name.toLowerCase().includes(Search.toLowerCase())
  );

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userSnap = await getDoc(doc(db, 'Users', user.uid));
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setIsAdmin(userData.role === 'admin');
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setIsAdmin(false);
      }
    });

    const unsubscribeProducts = onSnapshot(collection(db, 'Products'), (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        key: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    });
     

    return () => {
      unsubscribeAuth();
      unsubscribeProducts();
    };
  }, []);

 
  return (
    <div className='Products'>
      <Header />
      <div className="Products__Section">
        <ProductAdd IsAdmin={IsAdmin} />
        <Input
          size="large"
          placeholder="Search Product"
          type="text"
          prefix={<SearchOutlined />}
          className={`Input__Box`}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ProductTable IsAdmin={IsAdmin} Products={FilterProducts} />
      </div>
    </div>
  );
};

export default Product;
