import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateCamp = () => {
    const { _id, name, fees, dateTime, location, healthcareProfessional, description } = useLoaderData()
    console.log(name, fees)
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = async (data) => {
        console.log(data)

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // // console.log(res.data)
        if (res.data.success) {
            const updatedCampDetails = {
                name: data.name,
                fees: parseFloat(data.fees),
                dateTime: startDate,
                location: data.location,
                healthcareProfessional: data.healthcareProfessional,
                participantCount: parseInt(data.participantCount),
                description: data.description,
                image: res.data.data.display_url
            }

            const campRes = await axiosSecure.patch(`/updateCampDetails/${_id}`, updatedCampDetails);
            // console.log(profileRes.data)
            if (campRes.data.modifiedCount > 0) {
                // refetch()
                alert('Your Camp details has been Updated')
            }

        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="my-5">
                    <label className="label">
                        <span className="label-text">Camp Name</span>
                    </label>
                    <input {...register("name")} type="text" defaultValue={name} placeholder="Enter Camp Name" className="input input-bordered w-full" />
                </div>
                <div className="my-5">
                    <label className="label">
                        <span className="label-text">Camp Fees</span>
                    </label>
                    <input {...register("fees")} type="number" defaultValue={fees} placeholder="Enter camp Fees" className="input input-bordered w-full" />
                </div>
                <div className="my-5 space-x-2">
                    <label className="text-gray-700 dark:text-gray-200">Camp Date</label>
                    <DatePicker showIcon className="p-2 border " name="application_deadline" selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div className="my-5">
                    <label className="label">
                        <span className="label-text">Camp Location</span>
                    </label>
                    <input {...register("location")} defaultValue={location} type="text" placeholder="Enter Camp Location" className="input input-bordered w-full" />
                </div>
                <div className="my-5">
                    <label className="label">
                        <span className="label-text">Healthcare Professional Name</span>
                    </label>
                    <input {...register("healthcareProfessional")} defaultValue={healthcareProfessional} type="text" placeholder="Enter Camp Healthcare Professional Name" className="input input-bordered w-full" />
                </div>

                <div className="my-5">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input {...register("description")} defaultValue={description} type="text" placeholder="enter Camp description here...." className="input input-bordered w-full" />
                </div>



                <div className="my-2 form-control">
                    <label className="label">
                        <span className="label-text">Upload Camp Image</span>
                    </label>
                    <input type="file" {...register("image")} required className="my-2 file-input file-input-bordered file-input-xs w-full max-w-xs" />
                </div>

                <button className="btn btn-secondary">Update Camp</button>
            </form>

        </div>
    );
};

export default UpdateCamp;