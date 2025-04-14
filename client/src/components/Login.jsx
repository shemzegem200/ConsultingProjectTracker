import {useState, useRef, useContext} from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App.jsx";

export default function Login() {
  const {userInfo, setUserInfo, projects, setProjects} = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isLoading, setLoading] = useState(false);
  const b1 = useRef(null);
  const b2 = useRef(null);
  const navigate = useNavigate();
  
  const [role, setRole] = useState("user");

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
  };
  
  const prefetchProjectDetails = async()=>{
    try{
      const response = await fetch("http://localhost:4000/prefetch-project-info");
      if (!response.ok) throw new Error(response || "");
      const data = await response.json();
      setProjects(data);
      localStorage.setItem("projects", JSON.stringify(data));
    }
    catch(err){
      alert(err.message);
    }
  }

  const handleSignUp = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    b1.current.style.pointerEvents = "none";
    b1.current.style.cursor = "not-allowed";
    b1.current.style.opacity = "0.5";

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password, github, linkedin, role }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Signup failed");
      }
      
      alert("Signup successful! 🎉");
      setUserInfo({name, username, github, linkedin, role});
      localStorage.setItem("userInfo", JSON.stringify({name, username, github, linkedin, role}));
      await prefetchProjectDetails();
      navigate("/client");
    } catch (error) {
      alert(`Failed to register: ${error.message}`);
    } finally {
      b1.current.style.pointerEvents = "auto";
      b1.current.style.cursor = "pointer";
      b1.current.style.opacity = "1";
      setLoading(false);
    }
  };

  const handleSignIn = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    b2.current.style.pointerEvents = "none";
    b2.current.style.cursor = "not-allowed";
    b2.current.style.opacity = "0.5";

    try {
      const response = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Signin failed");
      }
      const data = await response.json();
      const details = data.user;
      alert("Signed in successfully! 🎉");
      setUserInfo({name:details.name, username:details.username, github:details.github, linkedin:details.linkedin, role:details.role});
      localStorage.setItem("userInfo", JSON.stringify({name:details.name, username:details.username, github:details.github, linkedin:details.linkedin, role:details.role}));
      await prefetchProjectDetails();
      navigate("/client");
    } catch (error) {
      alert(`Failed to signin: Invalid Credentials`);
    } finally {
      b2.current.style.pointerEvents = "auto";
      b2.current.style.cursor = "pointer";
      b2.current.style.opacity = "1";
      setLoading(false);
    }
  };

  return (
    <div className="outer-container">
      <div className={`container ${isSignUp ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={(ev) => handleSignUp(ev)}>
            <h1>Create Account</h1>
            <br />
            <br />
            <input
              required
              type="text"
              placeholder="Name"
              onChange={(ev) => setName(ev.target.value)}
            />
            <input
              required
              type="email"
              placeholder="Username"
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Password"
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <label>
              {/* checking user or supervisor */}
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="supervisor"
                  checked={role === "supervisor"}
                  onChange={() => setRole("supervisor")}
                />
                Supervisor
              </label>
            </div>
            
            {role === "user" && (
            <>
            <input
              type="text"
              placeholder="Github link"
              onChange={(ev) => setGithub(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Linkedin link"
              onChange={(ev) => setLinkedin(ev.target.value)}
            />
          </>)}
          
            <button ref={b1} type="submit">
              Sign Up
            </button>
            <br />
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={(ev) => handleSignIn(ev)}>
            <h1>Sign In</h1>
            <br />
            <input
              type="email"
              placeholder="Username"
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(ev) => setPassword(ev.target.value)}
            />

            {/* <a href="#">Forgot Your Password?</a> */}
            <button ref={b2} type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" onClick={toggleMode}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button className="hidden" onClick={toggleMode}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
