
import { useForm } from "react-hook-form";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const OrganizerProfile = () => {
    const { user } = useAuth()
    const [isAdmin] = useAdmin()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit } = useForm();


    const {data: userProfile = [] , refetch} = useQuery({
        queryKey: ['user'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/userProfile/${user.email}`)
            return res.data;
        }
    })
    // console.log(userProfile)

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
        // console.log(res.data)
        if(res.data.success){
            const profileDetails = {
                name: data.name,
                address: data.address,
                phone: parseFloat(data.phone),
                image: res.data.data.display_url

            }
            const profileRes = await axiosSecure.patch(`/user/${user.email}`, profileDetails);
            // console.log(profileRes.data)
            if(profileRes.data.modifiedCount > 0){
                refetch()
                alert('Your Profile Updated successfully')
            }
            
        }
    }
    return (
        <div className="flex flex-col justify-center w-full p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
            <img src={userProfile?.image || user?.photoURL} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
            <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold sm:text-2xl">{userProfile?.name || user?.displayName}</h2>
                    <p className="px-5 text-xs sm:text-base dark:text-gray-600">{isAdmin ? 'Organizer' : 'Participant'}</p>
                    <p className="px-5 text-xs sm:text-base dark:text-gray-600">Address : {userProfile?.address}</p>
                    <p className="px-5 text-xs sm:text-base dark:text-gray-600">Phone Number : {userProfile?.phone}</p>
                </div>

                <div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Update Profile Information</button>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle lg:modal-middle">
                        <div className="modal-box">
                            <section className="p-1  dark:bg-gray-100 dark:text-gray-900">
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="flex gap-9 my-5">
                                            <label className="label">
                                                <span className="label-text">Name</span>
                                            </label>
                                            <input {...register("name")} type="text" placeholder="Your Updated Name" className="input input-bordered w-full" />
                                        </div>

                                        <div className="flex gap-6 my-5">
                                            
                                            <label className="label">
                                                <span className="label-text">Address</span>
                                            </label>
                                            <input {...register("address")} type="text" placeholder="Enter Your Address" className="input input-bordered w-full" />
                                        </div>

                                        <label className="form-control">
                                            <div className="label">
                                                <span className="label-text">Phone Number</span>
                                            </div>
                                            <input {...register('phone')} type="tel" className="input input-bordered w-full" placeholder="Phone Number"></input>

                                        </label>

                                        <div className="my-2 form-control">
                                        <label className="label">
                                                <span className="label-text">Upload Image</span>
                                            </label>
                                            <input type="file" {...register("image")} className="my-2 file-input file-input-bordered file-input-xs w-full max-w-xs" />
                                        </div>

                                        <button className="btn">Update Profile</button>
                                    </form>
                                </div>
                            </section>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default OrganizerProfile;