import { Link } from 'react-router-dom';
import useCamps from '../../Hooks/useCamps'

const PopularCamps = () => {
    const [camps, loading, refetch] = useCamps()
    const sortedCamps = camps.sort((a, b) => b.participantCount - a.participantCount);
    return (
        <div className='grid grid-cols-3 gap-6'>
            {loading ? <span className="loading loading-spinner text-info w-40"></span> :
                sortedCamps.slice(0, 6).map(camp => <div key={camp._id} className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure ><img className='object-cover object-center border w-full h-80' src={camp?.image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{camp.name}</h2>
                        <p>Fees : {camp.fees}</p>
                        <p>Date Time : {camp.dateTime}</p>
                        <p>Location : {camp.location}</p>
                        <p>Healthcare Professional : {camp.healthcareProfessional}</p>
                        <p>Participants : {camp.participantCount}</p>
                        <div className=" justify-center">
                            <Link to={`/campData/${camp._id}`}>
                                <button className="btn btn-info btn-outline w-full">Camp Details</button>
                            </Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default PopularCamps;