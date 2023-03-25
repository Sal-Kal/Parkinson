import React from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Spinner from "react-bootstrap/Spinner";
import "react-circular-progressbar/dist/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UploadImage() {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  const [boxState, setBoxState] = React.useState(false);
  const [result, setResult] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleFile = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    let url = "http://127.0.0.1:8000/classify/";
    try {
      await axios.post(url, formData).then((res) => {
        setResult(res.data.response);
        setBoxState(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const inputRef = React.useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const resetUploadBox = () => {
    setBoxState(false);
    setLoading(false);
  };

  if (!boxState) {
    return (
      <div className="upload-box">
        {loading ? (
          <div className="loader">
            <Spinner animation="border" />
          </div>
        ) : (
          <form
            id="form-file-upload"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={inputRef}
              type="file"
              id="input-file-upload"
              onChange={handleChange}
            />
            <label
              id="label-file-upload"
              htmlFor="input-file-upload"
              className={dragActive ? "drag-active" : ""}
            >
              <p>Drag and drop your image here</p>
              <button className="upload-button" onClick={onButtonClick}>
                Upload
              </button>
            </label>
          </form>
        )}
      </div>
    );
  } else {
    return (
      <div className="upload-box">
        <div className="result-box">
          <img
            src={`data:image/png;base64,${result.image}`}
            alt="spiral-or-wave"
            id="drawing"
          />
          <CircularProgressbar
            value={result.score}
            text={result.score}
            styles={buildStyles({
              pathTransition: 2,
              strokeLinecap: "butt",
              pathColor: "#042825",
              textColor: "#042825",
              trailColor: "rgba(0,0,0,0)",
              backgroundColor: "#3e98c7",
            })}
          />
          <p>{result.shape}</p>
          <p>{result.prediction}</p>
          <button className="upload-button" onClick={resetUploadBox}>
            Upload Another
          </button>
        </div>
      </div>
    );
  }
}
