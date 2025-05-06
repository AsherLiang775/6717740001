import React, { useState, useEffect , useRef} from 'react'; 
import './Header.css';
import { BiSolidUserCircle } from 'react-icons/bi';
import { Link, NavLink, useNavigate } from 'react-router-dom';



const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const NAVBAR_HEIGHT = 60; 

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > NAVBAR_HEIGHT) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); 

    const navigate = useNavigate();
    const timerRef = useRef(null);

    const handleMouseEnter = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 2000); 
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []); 

    const isHomePage = location.pathname === '/';

    let navbarMainClass = 'solid-light'; // 默认设置为 solid-light，确保非首页时字体为黑色
    if (isHomePage) {
        navbarMainClass = isScrolled ? 'scrolled' : 'transparent'; // 仅在首页时根据滚动状态切换样式
    }

    const [isLoggedInVisual, setIsLoggedInVisual] = useState(() => {
        return localStorage.getItem('isLoggedInVisual') === 'true';
   });

   useEffect(() => {
    const handleStorageChange = () => {
        setIsLoggedInVisual(localStorage.getItem('isLoggedInVisual') === 'true');
    };

     window.addEventListener('storage', handleStorageChange);
     return () => {
         window.removeEventListener('storage', handleStorageChange);
     };
 }, []); 

   const handleLogout = () => {
    localStorage.removeItem('isLoggedInVisual');
    setIsLoggedInVisual(false);
    navigate('/');
    window.location.reload(); // 刷新页面
};

// 在登录成功后调用
const handleLoginSuccess = () => {
    setIsLoggedInVisual(true);
    window.location.reload(); // 刷新页面
};

const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${navbarMainClass}`}
        style={{ height: NAVBAR_HEIGHT }} > 
            <div className="container">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">ABOUT US</NavLink>
                    </li>
                </ul>
                <Link className="navbar-brand d-lg-flex mx-lg-auto" to="/">
                     <span className="logo-text">All Recipes</span>
                 </Link>
                <ul className="navbar-nav ms-auto">
                    {isLoggedInVisual ? (
                        <li
                            className="nav-item logged-in-icon-container" 
                            onMouseEnter={handleMouseEnter} 
                            onMouseLeave={handleMouseLeave} 
                        >
                            <NavLink className="nav-link icon-link user-profile-icon-link" to="/my-notes"> 
                                <BiSolidUserCircle className="User-icon logged-in-icon" /> 
                            </NavLink>
                            {isHovered && (
                                <div className="login-dropdown"> 
                                    <div className="dropdown-item">Click on the profile picture to enter my notes!</div> 
                                    <div className="dropdown-divider"></div> 
                                    <div className="dropdown-item logout-button" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    Log out
                                    </div>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                Sign in
                                <BiSolidUserCircle className="User-icon ms-1" /> 
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Header;