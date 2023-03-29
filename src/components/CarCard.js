import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const { id, make, model, year, engine, power, image, torque, zero_to_sixty_mph, top_speed } = car

return (
  <section className="car-page">
  <Link to={`/${id}/details`}> <img className="car-image" src={image} alt="car-image" /></Link>
  <br></br>
  <div className="bg-box">
)


}

export default CarCard;