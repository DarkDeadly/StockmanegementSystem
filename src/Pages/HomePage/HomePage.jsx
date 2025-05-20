import Header from '../../Component/header/Header'
import '../../util/global.css'
import './homepage.css'
import Btn from '../../Component/button/Btn'
import HomePageCarousel from '../../Component/homepageComponents/HomePageCarousel'
import { imageDataCarousel, Features } from "../../util/util.js"
import { Carousel } from 'antd'
import FeatureImage from "../../assets/FeatureImage.png"
import HomePageFeatures from '../../Component/homepageComponents/HomePageFeatures'
import { useState } from 'react'
import Cta from '../../Component/homepageComponents/Cta.jsx'
import { Link } from 'react-router'
const HomePage = () => {
  const [Selected, setSelected] = useState(null)
  const FeatureSelected = (item) => {
    setSelected(item)
  }

  return (
    <>
      <Header />
      <section className="Hero__Section">
        <h2>Modern Stock Management System</h2>
        <p>Streamline your inventory with our cutting-edge stock management system. Take control of your stock
          levels, orders and more with ease.
        </p>
        <div className="Hero__sectionBtns">
          <Btn btnText='Get Started' btnClass='navBtn' />
          <Btn btnText='Learn More' btnClass='navBtn Hero__btn' />
        </div>
      </section>
      <Carousel autoplay className='Carousel__Wrapper' autoplaySpeed={3000}>
        {imageDataCarousel.map((item) => (
          <HomePageCarousel
            CarouselImage={item.CarouselImage}
            CarouselHeading={item.CarouselHeading}
            CarousselText={item.CarouselText}
          />
        ))}
      </Carousel>
      <section className="feature__Section">
        <h2>StockMaster Features</h2>
        <div className="features__Section">
          <img src={FeatureImage} alt="featureImg" />
          <div className="Feature__content">
            {
            Features.map((item) => (
              <HomePageFeatures
                key={item.id}
                Feature__Text={item.FeatureText}
                Feature__Title={item.FeatureHeadLine}
                FeatureClass={`FeatureContainer ${Selected === item.id ? "Active" : ""}`}
                OnClickFn={() => FeatureSelected(item.id)}
              />

            ))}
          </div>
        </div>
      </section>
      <section className="cta__section">
        <Cta/>
      </section>

      <footer className='Footer__section'>
            <h1>StockMaster</h1>
            <div className="footer__nav">
               <Link>Contact Us</Link>
                <Link>Abouts Us</Link>
               <Link>Whats New</Link>
            </div>
            <hr/>
            © 2025 StockMaster Anis
      </footer>
    </>
  )
}

export default HomePage