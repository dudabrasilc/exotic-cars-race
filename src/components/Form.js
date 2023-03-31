import { React, useState } from "react";

function Form({ carsData, setCarsData, addCar }) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    engine: "",
    power: "",
    torque: "",
    zero_to_sixty_mph: "",
    top_speed: "",
    weight: "",
    image: ""
  })
  const [carSubmitted, setCarSubmitted] = useState("")
  const [checkCar, setCheckCar] = useState("")
  const [isAbleToSubmit, setIsAbleToSubmit] = useState(true)
  const [formErrors, setFormErrors] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(newCar => {
            setFormData({
              make: "",
              model: "",
              year: "",
              engine: "",
              power: "",
              torque: "",
              zero_to_sixty_mph: "",
              top_speed: "",
              weight: "",
              image: ""
            })
            addCar(newCar)
            setCarSubmitted("Your car was added successfully!")
            setCheckCar("To check it, please navigate to the Collection page.")
          })
        } else {
          resp.json().then(data => {
            setIsAbleToSubmit(false)
            setFormErrors(data.errors.map(error => {
              return (
                <>
                  <div className="form-validation" key={error.id}>{error}</div>
                </>
              )
            }))
          })
        }
      }
      )
  }

  return (

    <>
      <div className="bg-form">
        <div className="form-style-8">
          <h2>Upload Car Form</h2>
          {/* <h4>Fill out the form below to add a new car to the Collection</h4> */}
          <form onSubmit={handleSubmit}>
          <label className="labels">Make:</label>
            <select name="make" value={formData.make} onChange={handleChange} >
              <option className="options" value="none"> -- Select Make --</option>
              <option className="options" name="selectedMake" value="Maserati" > Maserati </option>
              <option className="options" name="selectedMake" value="Lamborghini"> Lamborghini </option>
              <option className="options" name="selectedMake" value="Ferrari"> Ferrari </option>
              <option className="options" name="selectedMake" value="Bugatti"> Bugatti </option>
              <option className="options" name="selectedMake" value="Porsche"> Porsche </option>
              <option className="options" name="selectedMake" value="McLaren"> McLaren </option>
              <option className="options" name="selectedMake" value="Pagani"> Pagani </option>
              <option className="options" name="selectedMake" value="Koenigsegg"> Koenigsegg </option>
            </select>
          <br></br>
            <label className="labels">Model:</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} />
<br></br>
            <label className="labels">Year:</label>
            <select name="year" value={formData.year} onChange={handleChange}>
              <option value="">-- Select Year --</option>
              {Array.from({length: new Date().getFullYear() - 1900 + 1}, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <br></br>
            <label className="labels">Engine:</label>
            <input type="text" name="engine" value={formData.engine} onChange={handleChange} />
            <br></br>

            <label className="labels">Power (hp):</label>
            <input type="text" name="power" value={formData.power} onChange={handleChange} />
            <br></br>

            <label className="labels">Torque (lb-ft + rpm):</label>
            <input type="text" name="torque" value={formData.torque} onChange={handleChange} />
            <br></br>

            <label className="labels">Top Speed (mph):</label>
            <input type="number" name="top_speed" value={formData.top_speed} onChange={handleChange} />
            <br></br>

            <label className="labels">0-60mph (sec):</label>
            <input type="number" name="zero_to_sixty_mph" value={formData.zero_to_sixty_mph} onChange={handleChange} />
            <br></br>

            <label className="labels">Weight (lbs):</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
            <br></br>
            
            <label className="labels">Image URL:</label>           
            <input type="text" name="image" value={formData.image} onChange={handleChange} />
            <br></br>
                <div className="form-errors">
            {isAbleToSubmit ?
              <>
                <div>{carSubmitted}</div>
                <div>{checkCar}</div>
              </>
              :
              <>
                {formErrors}
              </>
            }
            <button id="button" type="submit">Submit</button>
            </div>
            <br></br>
            <br></br>
            
          </form>
        </div>
      </div>
    </>
  )
}

export default Form;