# The-Eureka-Project
An interactive language learning platform for students and educators alike to promote collaborative and fun education.

A link to our problem statement can be found here:
https://docs.google.com/document/d/1UlvIg8OBKPYOV53w5qU_N7w8MA0mgIGG96oEihguxyA/edit?usp=sharing

A link to our presentation about our problem statement can be found here:
https://docs.google.com/presentation/d/1l_h5mRnEz1XtMrfsj9twyKiOJLdD2Y89V-LK6KheuGg/edit?usp=sharing


**Tool Proposal:**
* We are going to use ReactJS/React Native for our UI.
* We will run a Linux VM to house our SQL database.
* We will use a Web API written in Java.



**End-To-End “Hello World” Definition:**

Our Hello World Program will be as basic as clicking a button to say “hello” to the database, and then getting a response back from the DB that says “hello user!”

The entities involved in this:
* The UI has a button
* The user clicks the button, which sends a get request to the API
* The API then retrieves the message (“hello user”) from the DB and sends its back to the user (client)
* The UI displays “hello user” to the user

Thus, the UI, API, and DB all work together to make this happen. 
