import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useStore from "../store/useStore";

export default function LoginPage() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const login = useStore((state) => state.login);
    const navigate = useNavigate();

    const handelSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert('Please enter both email and password');
            return;
        }
            login(email);
            navigate('/categories');
    };

    return (
        <div className="min-h-screen flex items center justify-center bg-gray-100 p-4">
            <form onSubmit = {handelSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-center">Bayesn Library Login</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded-md" value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            <label className="block mb-2 text-sm font-medium text-gray-700">PassWord</label>
            <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded-md" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" className="w-full bg-blue-600 text-white p=2 rounded-md hover:bg-blue-700">Log In</button>
            </form>
        </div>
    );
}