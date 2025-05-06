import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiSpoon } from 'react-icons/gi';
import './Login.css'


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('isLoggedInVisual', 'true'); 
            navigate('/');  // 使用React Router导航到首页
            window.location.reload(); // 强制刷新页面更新全局状态
        } else {
            alert('The username or password is incorrect！');
        }
    };

return (
    <div className="login-container">
        <div className="d-flex align-items-center py-4 bg-body-tertiary">
            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <div className="text-center mb-4">
                        <GiSpoon className="logo-icon" />
                    </div>

          
                    <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1> 

                    <div className="form-floating">
                        <input
                            type="text" 
                            className="form-control"
                            id="usernameInput" 
                            name="username" 
                            placeholder="UserName: admin" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                        <label htmlFor="usernameInput">User Name: admin</label> 
                    </div>

                    {/* 密码输入框 - 应用 Bootstrap form-floating 样式 */}
                    <div className="form-floating">
                            <input
                                type="password"
                                className="form-control"
                                id="passwordInput" 
                                name="password" 
                                placeholder="Please enter the password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <label htmlFor="passwordInput">Password: admin</label> 
                        </div>

                        {/* Remember me 复选框 - 应用 Bootstrap form-check 样式 ，这里只保留结构 */}
                        <div className="form-check text-start my-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value="remember-me"
                                id="rememberMeCheck" 
                            
                            />
                            <label className="form-check-label" htmlFor="rememberMeCheck"> 
                                Remember me
                            </label>
                        </div>

                        {/* 提交按钮 - 应用 Bootstrap 按钮样式 */}
                        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>

                        {/* 底部文本 - 应用 Bootstrap 样式 */}
                        <p className="mt-5 mb-3 text-body-secondary text-center">© 2017–2025</p > {/* text-center 类在提供的 style 中被覆盖了 */}

                    </form>
                </main>
            </div>
        </div>
    )

}

export default Login;