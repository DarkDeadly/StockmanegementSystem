import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../util/firebase'
import { Button, Table } from 'antd';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Users"), (snapshot) => {
            setUsers(snapshot.docs.map((doc) => ({
                id: doc.id,
                key: doc.id,
                ...doc.data(),
            })));
        });

        return () => unsubscribe(); 
    }, []);

const handlePromoteAdmin = async (record) => {
  console.log('User Data:', record); // ✅ This logs the table row
  const docRef = doc(db, "Users", record.id);
  try {
    await updateDoc(docRef , {role : "admin"})
  } catch (error) {
    console.log(error)
  }
};
const handleDemote = async (record) => {
  console.log('User Data:', record); // ✅ This logs the table row
  const docRef = doc(db, "Users", record.id);
  try {
    await updateDoc(docRef , {role : "user"})
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
};

const columns = [
  { title: 'username', dataIndex: 'username', key: 'username' },
  { title: 'email', dataIndex: 'email', key: 'email' , responsive: ['sm']},
  { title: 'role', dataIndex: 'role', key: 'role' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (_, record) => (
        <div>
        <Button type="link" onClick={() => handlePromoteAdmin(record)}>
          Promote Admin
        </Button>
        <Button type="link" onClick={() => handleDemote(record)}>
          demote
        </Button>
        </div>
    )
  },
];


  return (
    <div>
     <Table
    columns={columns}
  
    dataSource={users}
    
  />
    </div>
  )
}

export default UserTable