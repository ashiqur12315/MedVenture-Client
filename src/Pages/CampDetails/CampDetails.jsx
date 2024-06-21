import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Modal1 from "./Modal1";


const CampDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: campData = [] } = useQuery({
        queryKey: ['campData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/campData/${id}`)
            return res.data;
        }

    })
    // console.log(campData)
    // console.log(typeof(campData))

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:-mx-6 lg:flex lg:items-center">
                    <img className="object-cover border-2 shadow-2xl object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]" src={campData.image} />

                    <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">



                        {/* <h3 className="mt-6 text-lg font-extrabold text-blue-500">Camp Fees: ${campData.fees}</h3>
                        <h3 className="mt-6 text-lg font-extrabold text-blue-500">Date And Time: ${campData.dateTime}</h3>
                        <h3 className="mt-6 text-lg font-extrabold text-blue-500">Location: ${campData.location}</h3>
                        <h3 className="mt-6 text-lg font-extrabold text-blue-500">Healthcare Professional: ${campData.healthcareProfessional}</h3>
                        <p className="text-gray-600 dark:text-gray-300 my-4">Participants: {campData.participantCount}</p>
                        <p className="text-gray-600 dark:text-gray-300 my-4">Description: {campData.description}</p> */}
                        <div className="max-w-3xl mx-auto p-4 bg-white shadow-2xl border border-blue-200 rounded-lg">
                            <h1 className="underline py-2 text-4xl font-bold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                                {campData.name}
                            </h1>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600 dark:text-gray-300"><span className="font-bold">Camp Fees:</span> ${campData.fees}</p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2"><span className="font-bold">Date and Time:</span> {campData.dateTime.slice(0,21)}</p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2"><span className="font-bold">Location:</span> {campData.location}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-300"><span className="font-bold">Healthcare Professional:</span> {campData.healthcareProfessional}</p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2"><span className="font-bold">Participants:</span> {campData.participantCount}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mt-4"><span className="font-bold">Description:</span> {campData.description}</p>
                        </div>

                        <div className=" text-center my-10">
                            <Modal1 camp={campData}></Modal1>
                        </div>
                        <div>
                            {/* {
                                isSameEmail ? <h2 className="text-red-400 bg-red-100 p-1 rounded-md my-4">You can not apply on your own posted job.</h2> : ''
                            }
                           { isDeadlinePassed ? <h2 className="text-red-400 bg-red-100 p-1 rounded-md my-4">Sorry, The job application deadline is over.</h2> : ''}
                            <button disabled={isSameEmail || isDeadlinePassed} className="btn btn-accent">
                                {
                                    isSameEmail || isDeadlinePassed ?  "Apply" : <Modal1 job={job}></Modal1> 
                                }
                            </button>
                            <Modal1 disabled={isSameEmail || isDeadlinePassed} className='btn' job={job}></Modal1> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CampDetails;