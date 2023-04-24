import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
    const { id, make, model, year, engine, power, image, torque, zero_to_sixty_mph, top_speed } = car

    return (
        <section className="car-page">
            <Link to={`/${id}/details`}> <img className="car-image" src={image} alt="car-image" /></Link>
            <br></br>
            <div className="bg-box">
                <h1 className="car-title">{make} {model}</h1>
                {/* <h3 className="car-subtitle">{model}</h3> */}
                <div className="typebox">
                    <small className="specs"><b>Year:</b> {year}</small>
                    <br></br>
                    <small className="specs"><b>Engine:</b> {engine}</small>
                    <br></br>
                    <small className="specs"><b>Power:</b> {power}</small>
                    <br></br>
                    <small className="specs"><b>Torque:</b> {torque}</small>
                    <br></br>
                    <small className="specs"><b>0-60mph:</b> {zero_to_sixty_mph}s</small>
                    <br></br>
                    <small className="specs"><b>Top speed:</b> {top_speed}mph</small>
                </div>
                <br></br>
            </div>
        </section>
    )
}

export default CarCard;