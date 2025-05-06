import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Marquee from "./Marquee"; // 引入Marquee组件
import { API_KEY } from '../assets/API_KEY';
import { Skeleton } from "@mui/material";
import './Popular.css';

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const getPopular = async () => {
    const check = localStorage.getItem('popular');
    if (check) {
      setPopular(JSON.parse(check));
      setIsLoading(false); 
    } else {
      try {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10`);
        const data = await api.json();
        localStorage.setItem('popular', JSON.stringify(data.recipes));
        setPopular(data.recipes);
        setIsLoading(false); 
      } catch (error) {
        setIsLoading(false); 
      }
    }
  };

  useEffect(() => {
    getPopular();
  }, []);

  
  const renderSkeleton = () => {
    const number = Array.from({ length: 10 }, (_, i) => i + 1); 
    return (
      <Marquee 
        direction="left" 
        speed={30} 
        pauseOnHover 
        gradientColor="transparent" 
      >
        <div style={styles.container}>
          {number.map((_, index) => (
            <div key={index} style={styles.skeletonCard}>
              <Skeleton height={200} width={250} />
            </div>
          ))}
        </div>
      </Marquee>
    );
  };

  // 渲染真实食谱卡片
  const renderRecipeCards = () => {
    // 复制数据实现无限滚动
    const loopedRecipes = [...popular, ...popular];
    return (
      <Marquee 
        direction="left" 
        speed={40} 
        pauseOnHover 
        gradientColor="#f5f7fa" 
        gradientWidth="200px" 
      >
        <div style={styles.container}>
          {loopedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} data={recipe} />
          ))}
        </div>
      </Marquee>
    );
  };

  return (
    <div className="popular-container">
      <h1 id="Popular">Popular Recipes</h1>
      {isLoading ? renderSkeleton() : renderRecipeCards()}
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    gap: '2rem', // 卡片间距
    padding: '10px',
    
  },
  skeletonCard: {
    width: '250px', 
  }
};

export default Popular;