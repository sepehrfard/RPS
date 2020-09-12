Done:
--------------------------------------------------------------------------------------
1. Video feed centered and video hidden only canvas shows with bounding box.

2. Bounding box area is only sent to the server for prediction

3. Classifer correctly predicts however very slow, look into timed detection to 
take load off of model classifing too many frames. 

4. prediction sent to client

5. corresponding emoji is highlighted with hand prediction, timing a little off 

6. Timer integrated with the game using seperated functions. 

7. CountDown works pefectly, issue had to do with mutltiple intervals needed to be cleared instead of just one. 


Things to do:
--------------------------------------------------------------------------------------
1 - Finetune exact timing for takeFrame to get the best results for model
2 - Brain storm a better way to start the game instead of press a Key
3 - leader board room
4 - better way to implement priority queue
5 - Retrain model on better data, use flask to save images for labeled data. 

