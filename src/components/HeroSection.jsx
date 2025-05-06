import React from 'react';
import { Link } from 'react-router-dom'; 
import './HeroSection.css'; 
import { GiSpoon } from 'react-icons/gi';
import Search from '../components/Search'; 
import Category from '../components/Category'; 





const HeroSection = () => {
    return (

        <header className="hero-section" style={{ backgroundImage: `url('/assets/img/1.jpg')` }}> 
            {/* bg-black bg-opacity-50: Bootstrap 类，黑色半透明背景覆盖层 */}
            {/* pt-10, pb-7, etc: Bootstrap 内边距工具类，用于调整上下空间 */}
            <div className="d-flex flex-column min-vh-100 bg-black bg-opacity-50 pt-10 pt-md-8 pb-7 pb-md-0">

                {/* 中间的文字和按钮区域 */}
                <div className="container my-auto">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 text-center text-white"> 
                            {/* Preheading */}
                            {/* text-xs, text-white, text-opacity-75: Bootstrap 文字大小、颜色、透明度 */}
                            <h6 className="text-xs text-opacity-75">
                            <span className="text-warning">Multiple Food</span> 
                                <span className="text-white">/ Restaurant</span> 
                            </h6>

                            {/* Heading */}
                            
                            <h1 className="display-1 mb-4">All Recipes
                            <GiSpoon className="logo-icon" /> </h1> 
                            

                            {/* Subheading */}
                            {/* text-center, text-white, text-opacity-75: 文字样式 */}
                            <p className="text-center text-opacity-75 mb-7">
                            Discover delicious recipes and enjoy the joy of cooking.
                            </p>

                            {/* Button */}
                            {/* btn, btn-outline-primary: Bootstrap 按钮样式 */}
                            {/* text-white, text-primary-hover: Bootstrap 文字颜色和悬停效果 */}
                            {/* mb-7, mb-md-0: Bootstrap 下边距 */}
                            <Link
                                className="btn btn-outline-primary text-white text-primary-hover mb-7 mb-md-0"
                                to="/recipes" > 
                                Browse recipes
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container search-category-container"> 
                    <div className="row justify-content-center"> 
                       
                       <div className="col-12 col-md-8">
                         <Search /> 
                         <Category /> 
                       </div>
                    </div>
                 </div>

                {/* 底部的社交链接和地址区域 */}
                <div className="container">
                    <div className="row">
                        <div className="col-md">
                            {/* Social links */}
                            {/* list-inline, list-inline-item: Bootstrap 列表样式 */}
                            <ul className="list-inline text-center text-md-start mb-3 my-md-5">
                                <li className="list-inline-item">
                                     {/* text-white, text-opacity-75, text-primary-hover: 文字/图标颜色和悬停效果 */}
                                    
                                    <a className="text-white text-opacity-75 text-primary-hover" href="#!" target="_blank" rel="noopener noreferrer"> 
                                        <i className="fab fa-twitter"></i> 
                                    </a>
                                </li>
                                <li className="list-inline-item ms-5"> {/* ms-5: Bootstrap 5 类，margin-left: 3rem */}
                                    <a className="text-white text-opacity-75 text-primary-hover" href="#!" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook-f"></i> 
                                    </a>
                                </li>
                                <li className="list-inline-item ms-5">
                                    <a className="text-white text-opacity-75 text-primary-hover" href="#!" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram"></i> 
                                    </a>
                                </li>
                                 
                            </ul>
                        </div>
                        <div className="col-md">
                            {/* Address */}
                             {/* font-serif: 斜体字体 */}
                             {/* text-white, text-opacity-75: 文字颜色透明度 */}
                             {/* text-center, text-md-end, text-lg-end: 不同屏幕下的文本对齐 */}
                            <p className="font-serif text-white text-opacity-75 text-center text-md-end text-lg-end my-md-5">
                                 {/* fas fa-map-marker-alt: Font Awesome 地图标记图标 */}
                                 {/* text-primary: 图标颜色 */}
                                 {/* me-3: Bootstrap 5 类，margin-right: 1rem */}
                                <i className="fas fa-map-marker-alt text-primary me-3"></i>
                                LiangJianYu StudentID:6717740001 
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeroSection;