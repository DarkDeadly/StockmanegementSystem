
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"

export const imageDataCarousel = [
  {
    CarouselImage: image1,
    CarouselText: "Track, manage, and update your stock in real-time with ease—right from the warehouse floor.",
    CarouselHeading: "Empower Your Team with Smart Inventory Control"
  },
  {
    CarouselImage: image2,
    CarouselText: "Visualize your entire inventory operation through powerful dashboards that simplify analytics and performance tracking.",
    CarouselHeading: "Make Data-Driven Decisions with Confidence"
  },
  {
    CarouselImage: image3,
    CarouselText: "Leverage cutting-edge technology to streamline logistics, reduce errors, and boost efficiency at every level.",
    CarouselHeading: "Automate, Optimize, and Scale with Precision"
  }
];

export const Features = [
  {
    id: 1,
    FeatureHeadLine: "Inventory Management",
    FeatureText: "Track stock levels, orders, and sales in real-time."
  },
  {
    id: 2,
    FeatureHeadLine: "Alert Notifications",
    FeatureText: "Automated Stock Alerts"
  },
  {
    id: 3,
    FeatureHeadLine: "Advanced Analytics",
    FeatureText: "Generate Detailed Reports"
  }
];

export const EmailVerif = (email) => {
   if ( /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return true
   }
   return "Invalid Email Format"
}
export const PasswordVerif = (signUp_Password) => {
   let PasswordErrors = [];

    if (signUp_Password.length < 8) {
        PasswordErrors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(signUp_Password)) {
        PasswordErrors.push("Password must contain at least one uppercase letter");
    }
    if (!/\d/.test(signUp_Password)) {
        PasswordErrors.push("Password must contain at least one number");
    }

   return PasswordErrors
}
export const confirmPassVerif = (password , confirmPassword) => {
  if (password === confirmPassword) {
    return true
  }
  return "Password doesnt match"
}