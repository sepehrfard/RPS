Done:
--------------------------------------------------------------------------------------
1. Video feed centered and video hidden only canvas shows with bounding box.

2. Bounding box area is only sent to the server for prediction

3. Classifer correctly predicts however very slow, look into timed detection to 
take load off of model classifing too many frames. 

4. prediction sent to client

5. corresponding emoji is highlighted with hand prediction, timing a little off 

6. Added timer, still havent written how to design countdown loop after the first execution
    last second of countdown handpicks class is created, map with counter to, it logs in all the preds of last second 
    and the max pick is the hand of choice to be evaluated for the game. 


Things to do:
--------------------------------------------------------------------------------------
1 - Timer loop to be implemented after the first round and define a trigger for the next loop
    - pause game once coutndown is done and show the result 
    - last second top choice is the hand to pick for the game eval 
    - try pulling ui triggers for hand out of fetch request 

