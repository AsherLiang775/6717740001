import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import './Veggie.css';
import { Skeleton } from "@mui/material";
import Marquee from "./Marquee";
import { API_KEY } from '../assets/API_KEY';

const Veggie = () => {

    const [veggie, setVeggie] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    const getVeggie = async () => {
        const check = localStorage.getItem('veggie');

        if (check) {
            setVeggie(JSON.parse(check));
            setIsLoading(false);
        } else {
            try {
                const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=vegetarian`);
                const data = await api.json();
                localStorage.setItem('veggie', JSON.stringify(data.recipes));
                console.log(data);
                setVeggie(data?.recipes);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch veggie recipes:", error);
                setIsLoading(false);
              }
        }
    }

    useEffect(() => {
        getVeggie();
    }, []);

    const styles = {
        container: {
            display: 'flex',
            gap: '20px',
        },
        skeletonCard: {
            width: '250px',
        }
    };

    const renderSkeleton = () => {
        const skeletonItems = Array.from({ length: 10 }, (_, i) => i + 1);
        return (
            <Marquee
                direction="left"
                speed={30}
                pauseOnHover
                gradientColor="transparent"
            >
                <div style={styles.container}>
                    {skeletonItems.map((_, index) => (
                        <div key={index} style={styles.skeletonCard}>
                            <Skeleton variant='rounded' height={200} width={250} animation='wave' />
                        </div>
                    ))}
                </div>
            </Marquee>
        );
    };

    const renderRecipeCards = () => {
        const loopedRecipes = [...veggie, ...veggie]; 

        return (
            <Marquee
                direction="left"
                speed={40}
                pauseOnHover
                gradientColor="#f5f7fa"
                gradientWidth="200px"
            >
                 <div style={styles.container}>
                    {loopedRecipes.map((recipe, index) => (
                        <RecipeCard key={recipe.id + '-' + index} data={recipe} />
                    ))}
                 </div>
            </Marquee>
        );
    };

    if (isLoading) {
        return (
            <div className="veggie-container">
                <h1 classnName ="veggie">Veggie Picks </h1>
                {renderSkeleton()}
            </div>
        );
    }

    if (veggie.length > 0) {
        return (
            <div className="veggie-container">
                <h1>Veggie Picks </h1>
                {renderRecipeCards()}
            </div>
        );
    }

    return (
        <div className="veggie-container">
            <h1>Veggie Picks </h1>
            <p>No veggie recipes found.</p>
        </div>
    );
};

export default Veggie;