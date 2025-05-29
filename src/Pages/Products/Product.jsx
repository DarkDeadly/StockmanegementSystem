import React, { useEffect, useState } from 'react'
import Header from '../../Component/header/Header'
import ProductAdd from '../../Component/ProductComponents/ProductAdd'
import "./product.css"
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import ProductTable from '../../Component/ProductComponents/ProductTable'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../util/firebase'
import { doc, getDoc } from 'firebase/firestore'
const Product = () => {
   const [IsAdmin, setIsAdmin] = useState(false)    
  
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
   
     return () => {
       unsubscribeAuth();
     }
   }, [])
  return (
    <div className='Products'>
        <Header/>
        <div className="Products__Section">
          <ProductAdd IsAdmin = {IsAdmin}/>
           <Input
              size="large"
              placeholder="Search Product"
              type="text"
              prefix={<SearchOutlined />}
              className={`Input__Box`}
           
            />
            <ProductTable IsAdmin = {IsAdmin} />
       </div>
       
    </div>
  )
}

export default Product