import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import ChatPage from "./pages/ChatPage";
import { GetSocket } from "./context/chat/ChatState";
import EditProfile from "./pages/EditProfile";
function App() {
    return (
        <GetSocket>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/setAvatar" element={<SetAvatar />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/" element={<ChatPage />} />
                </Routes>
            </BrowserRouter>
        </GetSocket>
    );
}

export default App;
