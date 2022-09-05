import React, { useState } from 'react'
import './LoginPage.css'
import {useNavigate } from "react-router-dom";


function LoginPage() {
    const navigate = useNavigate()
    const [formState,setFormState] = useState({
        "email":"",
        "password":""
    })
    const [formFeedback,setFormFeedback] = useState("")
    const {email,password} = formState
    const handleInput = (e)=> {
        setFormState(prev => ({...prev,[e.target.name]:e.target.value}))
      
      if(e.target.name==="email"){
        if(/^\S+@\S+\.\S+$/.test(e.target.value.toLowerCase())){
            setFormFeedback("success")
        }
        else {
            setFormFeedback("error")
        }
      }
        
    }
    const handleSubmit = (e)=> {
        e.preventDefault()
        console.log(email,password)
        navigate('/home')
    }

    const isDisabled = ()=> {
        return !(formFeedback === "success" && email.length > 0 && password.length > 0)
    }
  return (
    <div className="full-screen-container">
        <div className="login-container">
            <h1 className="login-title">Stock App</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className={`input-group ${formFeedback==="error" ? "error":formFeedback==="success"? "success":""}`}>
                    <label htmlFor="Email">Email</label>
                    <input autoComplete="off" type="email" name="email" id="email" value={formState.email}  onChange={handleInput}/>
                    <span className="msg">{formFeedback==="error" ? "Please Enter Valid Email" :'Valid email'}</span>
                </div>
                <div className="input-group">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" value={formState.password} onChange={handleInput}/>
                    <span className="msg">Incorrect password</span>
                </div>
                <button type="submit" className="login-button" disabled={isDisabled()}>Login</button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage