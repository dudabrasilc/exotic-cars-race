import CarCard from "./CarCard"
import SearchBar from "./SearchBar"

const Collection = ({ carsData, user, handleSearchAttributeChange, handleSearchTermChange, searchAttribute, searchTerm }) => {

    return (
        <div className="bg-collection">
            <div className="searchbar">
                <SearchBar handleSearchTermChange={handleSearchTermChange} handleSearchAttributeChange={handleSearchAttributeChange} searchAttribute={searchAttribute} searchTerm={searchTerm}></SearchBar>
            </div>
            <div className="card-wrapper">
                {carsData.map(car => {
                    return <CarCard car={car} key={car.id} user={user} />
                })}
            </div>
        </div>
    )

}

export default Collection;