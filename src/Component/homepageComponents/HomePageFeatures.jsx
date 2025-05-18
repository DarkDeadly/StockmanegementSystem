import React from 'react'
import "./homepageFeatures.css"
const HomePageFeatures = ({OnClickFn , Feature__Title , Feature__Text , FeatureClass}) => {
  return (
    <>
        <div className={FeatureClass} onClick = {OnClickFn}>
            <h3>{Feature__Title}</h3>
            <p>{Feature__Text}</p>
        </div>
    </>
  )
}

export default HomePageFeatures