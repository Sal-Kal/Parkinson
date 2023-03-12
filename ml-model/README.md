- Installing Requirements: `pip install -r requirements.txt`

- Trained models are present in the `models` folder.

- The model has been trained using the python notebook present in the `notebook` folder using Google Colab's GPU runtime.

- The script `Classifier.py` requires the path of the image that is to be classified to be handcoded within the script on line number `20`.

- Executing the script: `python Classifier.py` or `python3 Classifier.py`

- Once the image is classified, the image which was read by the classifier is displayed in a separate window after which the script expects an input from keyboard to end execution.

- The image detection works well only when the drawn spiral or wave is in the center of the image.
