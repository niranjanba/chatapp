import React, { useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import styled from "styled-components";
import { Buffer } from "buffer";
function DragAndDrop({ setSelectedAvatar, setIsUploadProfile }) {
    const dragRef = useRef(null);

    const onDragEnter = () => dragRef.current.classList.add("dragover");
    const onDragLeave = () => dragRef.current.classList.remove("dragover");
    const onDrop = () => dragRef.current.classList.remove("dragover");

    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedAvatar(reader.result.split(";")[1]);
            setIsUploadProfile(false);
        };
    };
    const handleCancelUpload = () => {
        setIsUploadProfile(false);
    };

    return (
        <Container>
            <div className="upload">
                <div
                    ref={dragRef}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className="drop-container"
                >
                    <div className="wrapper">
                        <AiOutlineCloudUpload className="upload-icon" />
                        <p>Drag and Drop Your Photo</p>
                    </div>
                    <input
                        type="file"
                        defaultValue=""
                        accept="image/png, image/jpeg"
                        onChange={handleChange}
                    />
                </div>
                {/* <button className="upload-cancel-btn">
                                Cancel
                            </button> */}
                <p className="upload-cancel-btn" onClick={handleCancelUpload}>
                    cancel
                </p>
            </div>
        </Container>
    );
}
const Container = styled.div`
    z-index: 1;
    min-width: 100vw;
    min-height: 100vh;
    position: absolute;
    background: #0000002b;
    display: flex;

    justify-content: center;
    align-items: center;
    .upload {
        width: 450px;
        height: 350px;
        background: white;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        .dragover {
            opacity: 0.6;
        }
        .drop-container {
            &:hover {
                opacity: 0.6;
            }
            background: aliceblue;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90%;
            height: 80%;
            border: 3px dashed #4a7efb;
            border-radius: 10px;
            .upload-icon {
                color: #4a7efb;
                width: 150px;
                height: 200px;
            }
            .wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
        }
        input {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }

        .upload-cancel-btn {
            cursor: pointer;
            font-weight: 400;
        }
    }
`;
export default DragAndDrop;
