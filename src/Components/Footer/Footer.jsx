import { FaSquareFacebook, FaYoutube } from "react-icons/fa6";
import { FaTwitter, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            
            <footer className="footer p-10 bg-base-200 text-base-content">
                <aside>
                    <img className="w-14" src="/a1.png" alt="" />
                    <p>MedVenture Ltd.<br />Providing successfully and making reliable Camps since 1980</p>
                    <p>MedVenture Headquatar <br />
                        123 Artisan Avenue <br />
                        Craftville, CA 12345 <br />
                        United States</p>

                    <div className="text-2xl flex gap-7">
                        <FaSquareFacebook />
                        <FaYoutube />
                        <FaInstagramSquare />
                        <FaTwitter />
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title">  Services</h6>
                    <a className="link link-hover">Professional Camping</a>
                    <a className="link link-hover">Camp Search and Recruitment</a>
                    <a className="link link-hover">Learning health and Camp Development</a>
                    <a className="link link-hover">Health services Sharing and Publishing</a>
                    <a className="link link-hover">Company Health Tech</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>

                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>


            </footer>
            <footer className="footer footer-center p-4 bg-base-200 text-base-content">
                <aside>
                    <p>Copyright © 2024 - All right reserved by MedVenture Ltd.</p>
                </aside>
            </footer>


        </div>
    );
};

export default Footer;