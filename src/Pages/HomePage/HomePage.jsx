import Header from '../../Component/header/Header'
import '../../util/global.css'
import './homepage.css'
import Btn from '../../Component/button/Btn'
import HomePageCarousel from '../../Component/homepageComponents/HomePageCarousel'
import CarouselData from "../../util/util"
import { Carousel } from 'antd'
const HomePage = () => {
  return (
    <>
    <Header/>
    <section className="Hero__Section">
      <h2>Modern Stock Management System</h2>
      <p>Streamline your inventory with our cutting-edge stock management system. Take control of your stock 
      levels, orders and more with ease.
      </p>
      <div className="Hero__sectionBtns">
        <Btn btnText='Get Started' btnClass='navBtn'/>
        <Btn btnText='Learn More'  btnClass='navBtn Hero__btn'/>
      </div>
    </section>
    <section className = "CarouselContainer">
            <Carousel autoplay  className='Carousel__Wrapper' autoplaySpeed={3000}> 
            {CarouselData.map((item) => (
                <HomePageCarousel 
                  CarouselImage={item.CarouselImage} 
                  CarouselHeading={item.CarouselHeading} 
                  CarousselText={item.CarouselText} 
            />
            ))}
          </Carousel>
          
    </section>
    </>
  )
}

export default HomePage