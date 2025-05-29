import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import './productTable.css'
import {   deleteDoc, doc,  getDoc,  getDocs, updateDoc } from 'firebase/firestore';
import {  db } from '../../util/firebase';
const ProductTable = ({IsAdmin , Products}) => {
    const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'category', dataIndex: 'category', key: 'category' , responsive: ['sm']},
  { title: 'total', dataIndex: 'total', key: 'total' },
  {
    title: 'price',dataIndex: 'price',key: 'price',},
];

    const DeleteProduct  = async( record ) => {
        const docRef = doc(db , "Products" , record.id)
        try {
            await deleteDoc(docRef)

        } catch (error) {
            console.log(error)
        }
    }
    
    const EditProduct = async(record , editnum) => {
                const docRef = doc(db , "Products" , record.id)
                try {
                    if (editnum < record.total) {
                      await updateDoc(docRef , {total : record.total - editnum})  
                    }
                   else {
                        await deleteDoc(docRef)
                   }
                } catch (error) {
                    console.log(error)
                }

    }
  return (
  <Table
    columns={columns}
    expandable={{
      expandedRowRender: record => 
      IsAdmin ?(
        <div className='TableBtn'>
        <Button 
        type='link' 
        style={{border : "1px solid rgb(12, 158, 158)"}}
        onClick={() => {
          const input = prompt(`Enter quantity to remove from ${record.name}:`);
          const editnum = parseInt(input, 10);

          if (isNaN(editnum) || editnum <= 0) {
            alert('Please enter a valid positive number.');
            return;
          }

          EditProduct(record, editnum);
        }}
        >Edit Total</Button>
        
        <Button 
        type='link' 
        style={{border : "1px solid rgb(12, 158, 158)"}} 
          onClick={() => {
          const confirmDelete = window.confirm(`Are you sure you want to delete ${record.name}?`);
          if (confirmDelete) {
            DeleteProduct(record);
          }
        }}
        >Delete</Button>

      </div>
      ):<div style={{ color: 'red' }}>You are not an admin. You don't have the privilege.</div>
        ,
      
   
      
      rowExpandable: record => record.name !== 'Not Expandable',
    }}
    dataSource={Products}
  />  )
}

export default ProductTable