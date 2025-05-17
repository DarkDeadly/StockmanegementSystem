import "./homePageCarousel.css"
const HomePageCarousel = ({CarouselImage , CarouselHeading , CarousselText}) => {
  return (
    <>
        <div className='carousel__Image' style={{backgroundImage :  `url(${CarouselImage})`}}>
        <div className="carousel__Container">
            <h2>{CarouselHeading}</h2>
            <p>{CarousselText}</p>
        </div>
        </div>
    </>
  )
}

export default HomePageCarousel