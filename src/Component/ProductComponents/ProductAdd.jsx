import React, { useState } from 'react'
import Btn from '../button/Btn'
import './productAdd.css'
import { Button, Input, Modal, Select, Space } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../util/firebase';
const ProductAdd = () => {
        const initialOptions = [
        { value: 'Sport', label: 'Sport' },
        { value: 'Furniture', label: 'Furniture' },
        { value: 'Computer science', label: 'Computer science' },
        { value: 'disabled', label: 'Disabled', disabled: true },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [options, setOptions] = useState(initialOptions);   // dynamic option list
    const [value, setValue] = useState([]);
    const [NumberError, setNumberError] = useState("")
    const [Number, setNumbers] = useState(0)
    const [name, setname] = useState("")
    const [price, setprice] = useState(0)

const addProducts = async (number, name, price, category) => {
  try {
    if (number === 0) {
      setNumberError("Total stock shouldn't be 0");
      return { success: false, message: "Stock can't be 0" };
    }
    
    await addDoc(collection(db, "Products"), {
      name,
      total: number,
      price,
      category
    });
    setIsModalOpen(false)
    setNumbers(0)
    setname("")
    setprice(0)
    setValue([]);

    return { success: true, message: "Product has been added" };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, message: error.message };
  }
};

    const handleChange = (newValue) => {
        const latest = newValue.filter(v => !value.includes(v));

        if (latest.length) {
            setOptions(prev => [...prev, { value: latest[0], label: latest[0] }]);
        }

        setValue(newValue);
        console.log('Selected:', newValue);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (

        <div className='ProductAdd'>
            <h1>Products</h1>
            <Btn btnText='Add Product' btnClass='navBtn' btnClick={showModal} />
            <Modal
                title="Add Product"
                closeIcon={<span aria-label="Close">X</span>}
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <Input
                    size="large"
                    placeholder="Product Name"
                    type='text'
                    className={`Input__Box `}
                    required
                    onChange={(e) => setname(e.target.value)}
                />
                <Input
                    size="large"
                    placeholder="Product price"
                    type="number"
                    className={`Input__Box `}
                    required
                    onChange={(e) => setprice(parseFloat(e.target.value))}
                />
                <Select
                    mode="tags"            
                    style={{ width: '100%' }}
                    placeholder="Select or type to add…"
                    value={value}
                    onChange={handleChange}
                    options={options}
                    className={`Input__Box `}
                    required
                />
                <Input
                    size="large"
                    placeholder="Product Input Total"
                    type='number'
                    className={`Input__Box `}
                    required
                    onChange={(e) => setNumbers(parseInt(e.target.value))}
                />
                {NumberError && <p style={{ color: "red" }}>{NumberError}</p>}
                <Btn btnText='Submit' btnClass='navBtn' btnClick={() => addProducts(Number , name , price , value)} />
            </Modal>
        </div>
    )
}

export default ProductAdd