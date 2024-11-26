import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export default function Register() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (user?._id) {
      navigate("/votes");
    }
  }, []);

  const handleRegister = async () => {
    try {
        const res = await fetch(`${import.meta.env.BASE_URL || "http://localhost:2222/api"}/users/register`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password, isAdmin}),
          });
          console.log(res);
          
          await res.json();
    } catch (err) {
        console.log({err})
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="checkbox"
        checked={isAdmin}
        onChange={(e) => setIsAdmin(e.target.checked)}
      />
      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}