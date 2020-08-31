Done:
--------------------------------------------------------------------------------------
1. Video feed centered and video hidden only canvas shows with bounding box.

2. Bounding box area is only sent to the server for prediction

3. Classifer correctly predicts however very slow, look into timed detection to 
take load off of model classifing too many frames. 

4. prediction sent to client

5. corresponding emoji is highlighted with hand prediction, timing a little off 

6. Timer integrated with the game using seperated functions. 

7. Dictionary for topchoice fully working, countdown is restarted by pressing any key
    - However, count down very quick cant see the actuall second decrementing jumps to 1 or 0


Things to do:
--------------------------------------------------------------------------------------
1 - Correct choice is not getting sent out to the game function after pressing key, fix the current prediction
2 - changeChoice() doesn't unhighlight the prev choice. 
3 - Correct timing for takeframe() between the last second and time 0 to determine choice. 

