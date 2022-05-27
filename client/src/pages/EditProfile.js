import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SetAvatarRoute, UpdateUserProfile } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import DragAndDrop from "../components/DragAndDrop";

function EditProfile() {
    const api = "https://api.multiavatar.com/452342";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [customAvatar, setCustomAvatar] = useState(undefined);
    const [isUploadProfile, setIsUploadProfile] = useState(false);
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fetchAvatars();
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        } else {
            const user = JSON.parse(localStorage.getItem("chat-app-user"));
            setUserName(user.name);
            setUser(user);
        }
    }, []);

    const toastOption = {
        autoClose: 3000,
        position: "top-right",
    };
    console.log(selectedAvatar);

    const updateUserProfile = async (e) => {
        const { data } = await axios.patch(`${UpdateUserProfile}/${user._id}`, {
            name: userName,
            image: customAvatar ? customAvatar : avatars[selectedAvatar],
        });

        if (data.status) {
            const user = data.user;
            const stringifiedUser = JSON.stringify(user);
            localStorage.setItem("chat-app-user", stringifiedUser);
            console.log("set");
            navigate("/");
        } else {
            toast.error("Error setting avatar. Try again", toastOption);
        }
    };
    return (
        <>
            {isLoading ? (
                <Container>
                    <iframe
                        title="loader"
                        src="https://giphy.com/embed/kUTME7ABmhYg5J3psM"
                        width="300"
                        height="200"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick an avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {!customAvatar ? (
                            avatars.map((avatar, index) => {
                                return (
                                    <div
                                        className={`avatar ${
                                            selectedAvatar === index
                                                ? "selected"
                                                : ""
                                        }`}
                                        key={index}
                                    >
                                        <img
                                            src={`data:image/svg+xml;base64,${avatar}`}
                                            alt="Avatar"
                                            onClick={() => {
                                                setSelectedAvatar(index);
                                            }}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="c-avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${customAvatar}`}
                                    alt="Custom avatar"
                                />
                            </div>
                        )}
                    </div>
                    {isUploadProfile && (
                        <DragAndDrop
                            setSelectedAvatar={setCustomAvatar}
                            setIsUploadProfile={setIsUploadProfile}
                        />
                    )}
                    <span>Or</span>
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsUploadProfile(true)}
                    >
                        Upload Photo
                    </span>
                    <div className="edit-name">
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <button
                        className="set-profile-btn"
                        onClick={updateUserProfile}
                        type="submit"
                    >
                        update profile
                    </button>
                </Container>
            )}
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100wh;
    gap: 2rem;
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0.4rem solid transparent;
            border-radius: 5rem;
            img {
                height: 6rem;
                border: 0.1rem solid transparent;
            }
        }
        .selected {
            border: 0.4rem solid #377083;
            box-shadow: 0px 0px 3px 3px rgb(0 0 0 / 20%);
            transform: scale(1.05);
        }
    }
}
    .c-avatar{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.4rem solid #377083;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 50%;
            border: 0.1rem solid transparent;
        }
        }
    .edit-name{
        input{
            width: 200px;
            height: 30px;
            outline: none;
            border: 1px solid;
            font-size: 1rem;
            padding-left: 10px;s
        }
    }
    }
    
    .set-profile-btn {
        border-radius: 2px;
        padding: 0.5rem 0.8rem;
        border: 1.5px solid #10a6b1;
        letter-spacing: 0.5px;
        font-weight: bold;
        background: #31c5e2;;
        text-transform: uppercase;
        cursor: pointer;
        transition: 0.5s ease-in-out;
        color: white;
        &:hover {
            background: #2c8191;
    }
`;

export default EditProfile;
