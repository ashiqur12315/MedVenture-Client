import { Link } from "react-router-dom";
import BannerSlider from "../../Components/Home/BannerSlider"
import PopularCamps from "../../Components/Home/PopularCamps";



const Home = () => {
    
    return (
        <div>
            <h2>This is home</h2>
            <div className="border-2">
                <BannerSlider></BannerSlider>
            </div>
            <div>
                <PopularCamps></PopularCamps>
                <Link className="m-6 btn mx-auto btn-success" to='/availableCamps'>See All Camps</Link>
            </div>
        </div>
    );
};

export default Home;