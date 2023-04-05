
import {React,useState}  from "react";
import { authService } from "../fbase";


import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
  } from "firebase/auth";

const Auth = () => {




const [email, setEmail]= useState("");
const [password, setPassword] =useState("");
const [newAccount, setNewAccount] = useState(true);
const [error, setError] = useState("");



const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };



  const onSubmit = async(event) => {
    event.preventDefault();

    try {
        let data;
        if (newAccount) {
            //create account-->createUserWithEmailAndPassword 사용
            data = await createUserWithEmailAndPassword(
                authService,
                email,
                password
              );
        } else {
            //log in
          data = await signInWithEmailAndPassword(authService, email, password);
        }
     
      } catch (error) {
        setError(error.message);
      }


  };


  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick=async(event)=>{
    
    let provider;
    provider = new GoogleAuthProvider();

    const result = await signInWithPopup(authService, provider);
   
  }


 


return(
<div>
    
<form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
           <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
           {error}
        </form>


        <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>

    <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        
    </div>

    </div>
    
);





};
export default Auth;