
import React, { useState } from 'react';
import './Auth.css';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    console.log(isSignUp);
    return (
        <div className={`cont ${isSignUp ? 's--signup' : ''}`}>
             <LoginForm />
            <div className="sub-cont">
            <div className="img">
                <div className="img__text m--up">
                    <h3>ليس لديك حساب؟ يرجى التسجيل!</h3>
                </div>
                <div className="img__text m--in">
                    <h3>إذا كان لديك حساب بالفعل، فقط قم بتسجيل الدخول.</h3>
                </div>
                <div className="img__btn" onClick={() => setIsSignUp(!isSignUp)}>
                    <span className={`m--up ${isSignUp ? '' : 'active'}`}>
                        التسجيل
                    </span>
                    <span className={`m--in ${isSignUp ? 'active' : ''}`} >
                    الولوج                    </span>
                </div>
            </div>

                 <SignUpForm />
            </div>
           
           
        </div>
    );
}

export default Auth;
