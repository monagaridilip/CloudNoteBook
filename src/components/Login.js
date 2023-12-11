import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"",password:""})
    let history = useNavigate();

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
            body: JSON.stringify({ email:credentials.email,password:credentials.password }),
          })
          const json = await response.json();
          console.log(json)
          if(json.success){
            //store the token in the local storage
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Login Successfull","success")
            history("/");
          }
          else{
            props.showAlert("Login Unsuccessfull enter valid credentials","danger")
          } 
    }
    return (
        <div className='container mt-2'>
            <h2>Enter details to login</h2>
            <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
