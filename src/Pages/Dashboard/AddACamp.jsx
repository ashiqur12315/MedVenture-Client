import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddACamp = () => {

    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
        // // console.log(res.data)
        if(res.data.success){
            const campDetails = {
                name: data.name,
                fees: parseFloat(data.fees),
                dateTime: data.dateTime,
                location: data.location,
                healthcareProfessional: data.healthcareProfessional,
                participantCount: parseInt(data.participantCount),
                description: data.description,
                image: res.data.data.display_url
            }

            const campRes = await axiosSecure.post('/addCamp', campDetails);
            // console.log(profileRes.data)
            if(campRes.data.insertedId){
                // refetch()
                alert('Your Camp has been added')
            }
            
        }
    }
    return (
        <div>
            <h2>THis is the Add A Camp Page</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="my-5">
                        <label className="label">
                            <span className="label-text">Camp Name</span>
                        </label>
                        <input {...register("name")} type="text" placeholder="Enter Camp Name" className="input input-bordered w-full" />
                    </div>
                    <div className="my-5">
                        <label className="label">
                            <span className="label-text">Camp Fees</span>
                        </label>
                        <input {...register("fees")} type="number" placeholder="Enter camp Fees" className="input input-bordered w-full" />
                    </div>
                    <div className="my-5">
                        <label className="label">
                            <span className="label-text">Camp Date & Time</span>
                        </label>
                        <input {...register("dateTime")} type="datetime-local" placeholder="Camp date and Time" className="input input-bordered w-full" />
                    </div>
                    <div className="my-5">
                        <label className="label">
                            <span className="label-text">Camp Location</span>
                        </label>
                        <input {...register("location")} type="text" placeholder="Enter Camp Location" className="input input-bordered w-full" />
                    </div>
                    <div className="my-5">
                        <label className="label">
                            <span className="label-text">Healthcare Professional Name</span>
                        </label>
                        <input {...register("healthcareProfessional")} type="text" placeholder="Enter Camp Healthcare Professional Name" className="input input-bordered w-full" />
                    </div>
                    <div className="my-5">
                        <label className="label">
                            <span className="label-text">Participant</span>
                        </label>
                        <input {...register("participantCount")} type="number" readOnly defaultValue={0} className="input input-bordered w-full" />
                    </div>
                    <div className="my-5">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input {...register("description")} type="text" placeholder="enter Camp description here...." className="input input-bordered w-full" />
                    </div>

                    

                    <div className="my-2 form-control">
                        <label className="label">
                            <span className="label-text">Upload Camp Image</span>
                        </label>
                        <input type="file" {...register("image")} className="my-2 file-input file-input-bordered file-input-xs w-full max-w-xs" />
                    </div>

                    <button className="btn btn-secondary">Add Camp</button>
                </form>
            </div>
        </div>
    );
};

export default AddACamp;