import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export function LoginForm() {
  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);

      //sign in firebase user
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/home");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((data) => {
      navigate("/home");
      //setValue(data.user.email);
      //localStorage.setItem("email", data.user.email);
    });
  };
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        {/* <h1>User {name} successfully registered!!</h1> */}
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <p>Please enter all the fields</p>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h3>Login</h3>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        <label className="label">Email</label>
        <br />
        <input
          onChange={handleEmail}
          className="form-control"
          value={email}
          type="email"
        />
        <br />
        <br />
        <label className="label">Password</label>
        <br />
        <input
          onChange={handlePassword}
          className="form-control"
          value={password}
          type="password"
        />
        <br />
        <br />
        <button onClick={handleSubmit} className="btn btn-info" type="submit">
          Submit
        </button>
        <br />
        <br />
        <img width={150} src={"./googlebtn.png"} onClick={googleSignIn} />
      </form>
    </div>
  );
}
