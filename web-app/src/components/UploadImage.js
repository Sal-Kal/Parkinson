import React from "react";
import axios from "axios";

export default function UploadImage(){
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [boxState, setBoxState] = React.useState(false);
    const [result, setResult] = React.useState({});

    const handleFile = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        let url = "http://127.0.0.1:8000/classify/"
        const res = await axios.post(url, formData)
        setResult(res.data.response)
        setBoxState(true)
    }

    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    // triggers when file is selected with click
    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    if(!boxState){
    return(
        <div className="upload-box">
            <form id="form-file-upload" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" multiple={true} id="input-file-upload" onChange={handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                    <p>Drag and drop your image here</p>
                    <button className="upload-button" onClick={onButtonClick}>Upload</button>
                </label>
            </form>
        </div>
    )
    }
    else{
        return(
            <div className="upload-box">
                <img src={`data:image/png;base64,${result.image}`} alt="spiral-or-wave" id="drawing"/>
            </div>
        )
    }
};
