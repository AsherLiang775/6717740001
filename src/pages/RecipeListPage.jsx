import React from 'react';
import Popular from '../components/Popular'; // 导入 Popular 组件
import Veggie from '../components/Veggie';   // 导入 Veggie 组件


const RecipeListPage = () => {
  return (
   
    <div className="recipe-list-page-container" style={{ padding: '50px 100px', marginTop: '60px' }}>
      
      <h2>You can make selections more comfortably here.</h2>
      
      <Popular />
     
      <Veggie />
    </div>
  );
}

export default RecipeListPage;