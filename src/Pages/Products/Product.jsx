import React from 'react'
import Header from '../../Component/header/Header'
import ProductAdd from '../../Component/ProductComponents/ProductAdd'
import "./product.css"
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
const Product = () => {
  return (
    <div className='Products'>
        <Header/>
        <div className="Products__Section">
          <ProductAdd/>
           <Input
              size="large"
              placeholder="Search Product"
              type="text"
              prefix={<SearchOutlined />}
              className={`Input__Box`}
           
            />
        </div>
    </div>
  )
}

export default Product