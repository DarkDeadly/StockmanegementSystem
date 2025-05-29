import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import './productTable.css'
import { collection,  onSnapshot } from 'firebase/firestore';
import {  db } from '../../util/firebase';
const ProductTable = ({IsAdmin}) => {
    const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'category', dataIndex: 'category', key: 'category' , responsive: ['sm']},
  { title: 'total', dataIndex: 'total', key: 'total' },
  {
    title: 'price',dataIndex: 'price',key: 'price',},
];
  const [Products, setProducts] = useState([]);
   useEffect(() => {
    const unsubscribeProducts = onSnapshot(collection(db, 'Products'), (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({
        id: doc.id,
        key: doc.id,
        ...doc.data(),
      })));
    });

 

    return () => unsubscribeProducts();
     
    
  }, []);

  return (
  <Table
    columns={columns}
    expandable={{
      expandedRowRender: record => 
      IsAdmin ?(
        <div className='TableBtn'>
        <Button type='link' style={{border : "1px solid rgb(12, 158, 158)"}}>Edit Total</Button>
        <Button type='link' style={{border : "1px solid rgb(12, 158, 158)"}}>Delete</Button>

      </div>
      ):<div style={{ color: 'red' }}>You are not an admin. You don't have the privilege.</div>
        ,
      
   
      
      rowExpandable: record => record.name !== 'Not Expandable',
    }}
    dataSource={Products}
  />  )
}

export default ProductTable