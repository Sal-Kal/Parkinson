import React from "react";
import UploadImage from "./UploadImage";

export default function Info(){
    return(
        <div className="info">
        Parkinson's disease is a progressive disorder that affects the nervous system and the parts of the body controlled by the nerves. Symptoms start slowly. The first symptom may be a barely noticeable tremor in just one hand. Tremors are common, but the disorder may also cause stiffness or slowing of movement.
        <br/>
        Our app helps in detecting early stages of Parkinson's disease.
        <br/>
        <br/>
        <h3><u>How to use:</u></h3>
        <ol>
            <li>Use a blank sheet of paper and a pen to draw either a spiral or a wave.</li>
            <li>Take a photo of your drawing using a smartphone or a digital camera.</li>
            <li>Save the photo on your computer or device.</li>
            <li>Upload the image by either clicking the upload button below or dragging and dropping the image in the drop area.</li>
            <li>Wait for the image to upload and for the test to complete.</li>
            <li>The test will show you a score between 0 and 100. If the score is below 50, it may indicate early symptoms of Parkinson's disease.</li>
        </ol>
        <br/>
        <UploadImage />
        <br />
        Disclaimer: Please note that the hand-drawn image test is not a substitute for a medical diagnosis. If you have concerns about your health, please consult with your doctor or healthcare provider. The hand-drawn image test is intended for informational purposes only and is not a medical advice or diagnosis.
    </div>
    )
}
