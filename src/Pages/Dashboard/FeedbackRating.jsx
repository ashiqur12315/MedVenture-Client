import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";
import '@smastrom/react-rating/style.css'
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useRef } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const FeedbackRating = () => {
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: '',
            rating: 0,
        },
    });
    const fmodalRef = useRef(null);

    function onSubmit(data) {
        // alert(JSON.stringify(data, undefined, 2));
        const feedback = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            feedback: data.name,
            rating: data.rating
        }


        axiosSecure.post('/feedback', feedback)
            .then(res => {
                if (res.data.insertedId) {
                    fmodalRef.current.close();
                    Swal.fire({
                        title: "Submitted!",
                        text: "Thanks for giving us Feedback",
                        icon: "success"
                    });
                }
            })


    }
    return (
        <div>

            <button className="btn btn-success btn-outline" onClick={() => fmodalRef.current.showModal()}>Feedback</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle " ref={fmodalRef}>
                <div className="modal-box">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-4">
                            <label htmlFor="name" className="text-blue-400 font-bold">
                                Enter Your Suggestions : 
                                <input type="text" className="border-2 rounded-sm w-full py-3 h-50" id="name" {...register('name', { required: true })} />
                            </label>
                            {errors.name && <div className="text-red-600">Suggestions cannot be empty.</div>}
                        </div>

                        <div>
                            <div id="rating_label" className="text-xl text-orange-400 underline">Rate Your experience in our Camp</div>
                            <Controller
                                control={control}
                                name="rating"
                                rules={{
                                    validate: (rating) => rating > 0,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Rating
                                        value={value}
                                        isRequired
                                        onChange={onChange}
                                        visibleLabelId="rating_label"
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                            {errors.rating && <div>Rating is required.</div>}
                        </div>

                        <button type="submit" className="btn btn-success btn-outline w-full my-4">
                            Submit review
                        </button>


                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>

                </div>
            </dialog>

        </div>
    );
};

export default FeedbackRating;