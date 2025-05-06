
import React from 'react';
import './AboutPage.css';

const AboutPage = () => {

    
    const Name = "Liang JianYu";       // <-- 请替换成你的实际名字
    const StudentId = "6717740001"; // <-- 请替换成你的实际学号

    return (
        
        <div className="about-page-container" style={{ padding: '50px 100px', marginTop: '60px', lineHeight: '1.6' }}>
            {/* 页面标题 */}
            <h2>About Project</h2>

            {/* 原作者信息和项目链接 */}
            <p>
            This project is based on the React Recipe App by the original author itisameerkhan.
            </p>
            <p>
            Original project GitHub address:
                
                <a href="https://github.com/itisameerkhan/react-recipe-app" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '5px' }}>
                    https://github.com/itisameerkhan/react-recipe-app
                </a>
            </p>

            {/* 你的信息 */}
            <div style={{ marginTop: '30px' }}> {/* 添加一些上边距 */}
                <h3>My information</h3>
                <p>Name: {Name}</p>
                <p>Student ID: {StudentId}</p>
            </div>

        </div>
    );
};

export default AboutPage;