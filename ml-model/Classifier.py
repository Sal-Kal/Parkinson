import cv2 as cv
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model

# Loading the Models
sow_model = load_model('./models/sow.h5')
spiral_model = load_model('./models/spiral.h5')
wave_model = load_model('./models/wave.h5')

# Dimensions for resizing
spiral_height = 256
spiral_width = 256

wave_height = 256
wave_width = 512

# Reading the Image
drawing = cv.imread('./test/test_3.jpg')

# Calculating the Center of the Image
center = (drawing.shape[1]/2, drawing.shape[0]/2)
height, width, channels = drawing.shape
area = height * width
# Calculating the 80% of Image area
threshold_area = 0.8 * area

# Finding Contours
gray = cv.cvtColor(drawing, cv.COLOR_BGR2GRAY)
_, thresh = cv.threshold(gray, 150, 255, cv.THRESH_BINARY_INV+cv.THRESH_OTSU)
contours, _ = cv.findContours(thresh, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
# Sorting the Contours based on area of the Contour
contours = sorted(contours, key=cv.contourArea, reverse=True)
# Selecting the top 4 contours with most area
rects = contours[0:4]

# Finding the Contour which is closest to the middle of the image
min_distance = float('inf')
closest = None

for contour in rects:
    # Find the bounding rectangle for the contour
    x, y, w, h = cv.boundingRect(contour)
    cv.rectangle(drawing, (x, y), (x+w, y+h), (0, 255, 255), 3)
    rect_area = w * h
    # Skip contour if area of the contour is more than or equal to 80% of the image
    if rect_area >= threshold_area:
        continue

    # Find the center of the bounding rectangle
    rect_center = (x + w/2, y + h/2)

    # Calculate the distance between the center of the rectangle and the center of the image
    distance = ((rect_center[0] - center[0])**2 + (rect_center[1] - center[1])**2)**0.5

    # Check if the current rectangle is closer to the center of the image than the previous closest rectangle
    if distance < min_distance:
        min_distance = distance
        closest = contour

x, y, w, h = cv.boundingRect(closest)

crop_img = drawing[y:y+h, x:x+w]

aspect_ratio = float(w) / h if h != 0 else float('inf')

# Checking if the image is more likely to be a spiral or a wave
if aspect_ratio >= 1.7:
    crop_img = cv.resize(crop_img, (wave_width, wave_height))
else:
    crop_img = cv.resize(crop_img, (spiral_width, spiral_height))

processed = tf.image.resize(cv.cvtColor(crop_img, cv.COLOR_BGR2RGB), (256, 256))


sow = sow_model.predict(np.expand_dims(processed/255, 0))

if sow > 0.5:
  # Wave
  prediction = wave_model.predict(np.expand_dims(processed/255,0))
else:
  # Spiral
  prediction = spiral_model.predict(np.expand_dims(processed/255,0))

if prediction > 0.5:
   print('Parkinson')
else:
   print('Healthy')

# cv.imshow('Given Image', crop_img)
cv.imshow('Given Image', drawing)
cv.imwrite('contour2.jpg', drawing)
cv.waitKey(0)
