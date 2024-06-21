import { Link } from "react-router-dom";


const CampCard = ({ camp }) => {
	return (
		<div key={camp._id} className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{camp.name}</h2>
                        <p>Fees : {camp.fees}</p>
                        <p>Date Time : {camp.dateTime}</p>
                        <p>Location : {camp.location}</p>
                        <p>Healthcare Professional : {camp.healthcareProfessional}</p>
                        <p>Participants : {camp.participantCount}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/campData/${camp._id}`}>
                                <button className="btn btn-primary">Camp Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
	);
};

export default CampCard;
