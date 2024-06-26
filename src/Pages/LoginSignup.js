 
import './Css/LoginSignup.css';
import {useState} from 'react';
const LoginSignup =()=>{
    const [state, setState] =useState("Sign Up");

    const [formData, setFormData] =useState({
        name:"",
        password:"",
        email:""
    });
    const changeHandler =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }



    const login =async()=>{
       console.log("login function executed",formData);
       let responseData;
       await fetch('http://localhost:4000/login',{
           method:"POST",
           headers:{
               Accept:'application/formData',
               'Content-Type':'application/json'
           },
           body:JSON.stringify(formData),
       }).then((res)=>res.json()).then((data)=>responseData=data)

       if(responseData.success){
           localStorage.setItem("auth-token",responseData.token);
           window.location.replace("/");
       }else{
           alert(responseData.errors)
       }

    }

    const signup =async()=>{
        console.log("signup fuction executed",formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:"POST",
            headers:{
                Accept:'application/formData',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        }).then((res)=>res.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem("auth-token",responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors)
        }
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up" ? <input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder="Your Name"/>:<></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Your Email"/>
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Your Password"/>
                </div>
                          <button onClick={()=>{state==="Login" ?login():signup()}}>Continue</button>
                {state==="Sign Up" ?<p className="loginsignup-login">Already have an account?<span onClick={()=>{setState("Login")}}> Login here</span></p>:<p className="loginsignup-login">Create an account?<span onClick={()=>{setState("Sign Up")}}> Click here</span></p>}
                <div className="loginsignup-agree">
                {state==="Sign Up" ?<input type="checkbox"  required />:<></>}
                    {state==="Sign Up" ? <p>By continuing, i agree to the terms of use and privacy policy.</p>:<></>}
                </div>
                
            </div>
        </div>
    )
}

export default LoginSignup;