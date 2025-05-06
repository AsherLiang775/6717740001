
import HeroSection from "../components/HeroSection";
import './Home.css';
import Veggie from "../components/Veggie";
import Popular from "../components/Popular";

const Home = () => {
    return (
        <div className="home-container">
            <HeroSection />
            <Popular />
            <Veggie />
        </div>
    )
}

export default Home;