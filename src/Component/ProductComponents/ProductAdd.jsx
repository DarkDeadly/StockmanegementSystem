import React, { useState } from 'react'
import Btn from '../button/Btn'
import './productAdd.css'
import { Modal } from 'antd';
const ProductAdd = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
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
        <Btn btnText='Add Product' btnClass='navBtn' btnClick={showModal}/>
          <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default ProductAdd