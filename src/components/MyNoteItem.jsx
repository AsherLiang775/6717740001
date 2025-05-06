import React from 'react';
import { Link } from 'react-router-dom'; 
import './MyNoteItem.css'; 


const MyNoteItem = ({ note, recipeImage }) => {
    return (
       
        <div className="my-note-item">
            {/* 左侧：食谱图片 */}
            <div className="note-item-image">
                {recipeImage ? (
                    
                    <img src={recipeImage} alt={`食谱图片: ${note.recipeId}`} />
                ) : (
                    
                    <div className="image-placeholder">图片加载中或缺失</div> // 
                )}
            </div>

            {/*  右侧：笔记内容和链接  */}
            <div className="note-item-content">
                {/* 笔记文本 */}
                <p className="note-item-text">{note.text}</p>

                {/* 时间戳和食谱链接 */}
                <small className="note-item-meta">
                Added on: {new Date(note.timestamp).toLocaleString()}
                  
                    {note.recipeId && (
                         // Link 的 to 属性指向对应的食谱详情页
                        <span style={{ marginLeft: '10px' }}>
                             <Link to={`/recipe/${note.recipeId}`}>View recipes</Link>
                        </span>
                    )}
                </small>
            </div>
        </div>
    );
};

export default MyNoteItem;