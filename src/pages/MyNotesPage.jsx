import React, { useEffect, useState } from 'react';

import { getAllRecipeNotes } from '../utils/localStorageHelpers'; 
import MyNoteItem from '../components/MyNoteItem'; 
import { API_KEY } from '../assets/API_KEY'; 


const MyNotesPage = () => {
    const [allNotes, setAllNotes] = useState([]);
  
    const [recipeImages, setRecipeImages] = useState({});
    
    const [imagesLoading, setImagesLoading] = useState(true);


    useEffect(() => {
        // Load all notes from localStorage on component mount
        const notes = getAllRecipeNotes();
        setAllNotes(notes);

        //获取对应食谱的图片
        if (notes.length > 0) {
            setImagesLoading(true); // 开始加载图片
            // 获取所有唯一的 recipeId
            const uniqueRecipeIds = [...new Set(notes.map(note => note.recipeId))];

            
            const fetchImages = async () => {
                const images = {};
                
                const promises = uniqueRecipeIds.map(async (id) => {
                     try {
                         
                         const data = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`); // includeNutrition=false 减少数据量
                         const detailsData = await data.json();
                         if (detailsData.image) {
                             images[id] = detailsData.image; 
                         } else {
                             images[id] = null; 
                         }
                     } catch (e) {
                         console.error(`Error fetching image for recipe ${id}`, e);
                         images[id] = null; 
                     }
                });

                await Promise.all(promises); 
                setRecipeImages(images); 
                setImagesLoading(false); 
            };

            fetchImages(); 
        } else {
             setImagesLoading(false); 
        }

    }, []); 


    return (
        // 添加容器 div 和样式
        <div className="my-notes-page-container" style={{ padding: '50px 100px', marginTop: '60px' }}>
            <h2>My all notes</h2>

            {imagesLoading ? (
                 <p>Loading note pictures...</p> // 在图片加载时显示加载提示
            ) : allNotes.length > 0 ? (
                // Map through all notes and display them using MyNoteItem
                <div className="all-notes-list" style={{ marginTop: '20px' }}>
                    {allNotes.map(note => (
                         
                        <MyNoteItem
                            key={note.id} // 使用 note.id 作为 key
                            note={note}
                            // 从 recipeImages state 中查找对应的图片 URL
                            recipeImage={recipeImages[note.recipeId]}
                        />
                    ))}
                </div>
            ) : (
                // 如果没有笔记且图片加载完成，显示提示信息
                <p>No notes have been added yet.</p>
            )}
        </div>
    );
};

export default MyNotesPage;