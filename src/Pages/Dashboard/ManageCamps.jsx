import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UpdateCamp from "./UpdateCamp";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../Components/Shared/SectionTitle";


const ManageCamps = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const {
        data: allCampsData = [],
        isPending: loading,
        refetch,
    } = useQuery({
        queryKey: ["camps"],
        queryFn: async () => {
            const res = await axiosPublic.get("/camps");
            return res.data;
        },
    });
    // console.log(allCampsData)
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteCamp/${id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your camp has been deleted successfully.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div>
            <SectionTitle heading='Manage All Your Medical Camps'></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Camp Name</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th>Healthcare Professional</th>
                            <th>Update Camp</th>
                            <th>Delete Camp</th>
                        </tr>
                    </thead>
                    <tbody>
                        { loading? <span className="loading loading-spinner text-info"></span> :
                            allCampsData.map((camp, index) => <tr key={camp._id}>
                                <th>{index + 1}</th>
                                <td>{camp.name}</td>
                                <td>{camp.dateTime}</td>
                                <td>{camp.location}</td>
                                <td>{camp.healthcareProfessional}</td>
                                <td><Link to={`/dashboard/updateCamp/${camp._id}`} className="btn btn-warning">Update</Link></td>
                                <td><button onClick={()=> handleDelete(camp._id)} className="btn btn-warning">Delete</button></td>
                                
                            </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCamps;