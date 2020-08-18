Done:
--------------------------------------------------------------------------------------
1. Video feed centered and video hidden only canvas shows with bounding box.

2. Bounding box area is only sent to the server for prediction

3. Classifer correctly predicts however very slow, look into timed detection to 
take load off of model classifing too many frames. 

4. prediction sent to client

5. corresponding emoji is highlighted with hand prediction, timing a little off 

Things to do:
--------------------------------------------------------------------------------------
1 - Emoji Hilighting done
    - Should implement a waiting counter to start detecting once its down to 0
    to limit all mistakes made classifying radom images until the correct hand. 
    - or maybe timer as you keep your hand in position to make sure of accurate result. 
    
2 - Timed detection, to decrease lag between detections

3 - leader board

