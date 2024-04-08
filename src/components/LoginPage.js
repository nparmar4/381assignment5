import React, {useState, useContext} from 'react';
import Header from './Header.js';
import LoginForm from './LoginForm.js';
import SignupForm from './SignupForm.js';
import Footer from './Footer.js';

function LoginPage(){
    const [toggle, setToggle] = useState(true);


    return(

        <div>
            <Header />
            {toggle ? <LoginForm toggle={toggle} setToggle={setToggle}/>
            : <SignupForm toggle={toggle} setToggle={setToggle}/>
            }
            <Footer />
        </div>
    )
}

export default LoginPage;