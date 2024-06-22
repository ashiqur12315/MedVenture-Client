import { Link } from "react-router-dom";
import BannerSlider from "../../Components/Home/BannerSlider"
import PopularCamps from "../../Components/Home/PopularCamps";
import SectionTitle from "../../Components/Shared/SectionTitle";
import HomeFeedback from "./HomeFeedback";



const Home = () => {
    
    return (
        <div>
            
            <div className="border-2">
                <BannerSlider></BannerSlider>
            </div>
            <div>
                <SectionTitle heading='Popular Medical Camps' subheading='Join us at our Popular medical camps to receive expert healthcare services, tailored to meet the needs of every individual.'></SectionTitle>
                <PopularCamps></PopularCamps>
                <div className="container mx-auto text-center"><Link className="m-6 btn mx-auto btn-info" to='/availableCamps'>See All Camps</Link></div>
                <div><HomeFeedback></HomeFeedback></div>
            </div>
        </div>
    );
};

export default Home;