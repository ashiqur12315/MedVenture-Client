import { Link } from "react-router-dom";


const CampCard = ({ camp }) => {
	return (
		<div key={camp._id} className="card card-compact max-w-96 bg-base-100 shadow-xl">
                    <figure><img className="object-cover object-center border w-full h-80" src={camp?.image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{camp.name}</h2>
                        <p>Fees : {camp.fees}</p>
                        <p>Date Time : {camp.dateTime}</p>
                        <p>Location : {camp.location}</p>
                        <p>Healthcare Professional : {camp.healthcareProfessional}</p>
                        <p>Participants : {camp.participantCount}</p>
                        <p>Description : {camp.description.slice(0,40)}...</p>
                        <div className=" justify-center">
                            <Link to={`/campData/${camp._id}`}>
                                <button className="btn btn-info btn-outline w-full">Camp Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
	);
};

export default CampCard;
