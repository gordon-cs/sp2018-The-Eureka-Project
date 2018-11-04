# The-Eureka-Project
An interactive language learning platform for students and educators alike to promote collaborative and fun education.

A link to our problem statement can be found here:
https://docs.google.com/document/d/1UlvIg8OBKPYOV53w5qU_N7w8MA0mgIGG96oEihguxyA/edit?usp=sharing

A link to our presentation about our problem statement can be found here:
https://docs.google.com/presentation/d/1l_h5mRnEz1XtMrfsj9twyKiOJLdD2Y89V-LK6KheuGg/edit?usp=sharing

**End-To-End “Hello World” Definition:**

Our Hello World Program will be as basic as clicking a button to say “hello” to the database, and then getting a response back from the DB that says “hello user!”

The entities involved in this:
* The UI has a button
* The user clicks the button, which sends a get request to the API
* The API then retrieves the message (“hello user”) from the DB and sends its back to the user (client)
* The UI displays “hello user” to the user

Thus, the UI, API, and DB all work together to make this happen. 


We need to have a VM in order for us to have admin privileges. 
On this VM, we will install
* Node.js, 
* SQL, and 
* React Native;

As for applications, we will install
* Visual Studio Code and 
* some kind of SQL server manager

For authentication, we will use Firebase:
* https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html

We will use 'create-react-native-app' as opposed to 'react-native init' because of the following reasons expressed on the CRNA's github page:
* "**Minimal "Time to Hello World"**: Create React Native App should reduce the setup time it takes to try building a mobile app to the absolute minimum, ideally on par with React web development (especially as seen with Create React App).
* **Develop on Your Device**: It should be easy to develop on a physical device when you want to test how your app feels and responds to inputs.
* **One Build Tool**: If you just want to get started with React Native, you shouldn't need to install Xcode, Android Studio, NDKs, or mess with environment variables.
* **No Lock-In**: You can always "eject" to your own build setup if you need to write custom native code or modify how your app is built."
(source: https://github.com/react-community/create-react-native-app)


# Applications
### 1. Visual Studio
To install the code editor:
https://www.w3schools.com/sql/default.asp

There were some issues here, make sure that you check out this link if you have trouble (https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html)

Extensions:


# Tools/Libraries/Stuff
### 1. Node.js
First, we must install the latest version of Node.js.
  https://nodejs.org/en/
> sudo apt install nodejs

To check that it was installed:
> node -v
  
### 2. Yarn
Next, we will install yarn (a package manager) (https://yarnpkg.com/en/docs/install#debian-stable)

(Make sure curl is installed first): 
> sudo apt install curl

> curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

> echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

> sudo apt-get update && sudo apt-get install yarn
  
Test that it works by:

> yarn --version
  
Add the ability to execute the CRNA command:

> yarn global add create-react-native-app@1.0.0
(the @1.0.0 is the version of CRNA to install, we could potentially do a newer version)

### 3. Expo CLI
(Expo is a platform that helps build fully functional React Native apps without having to write native code; AKA no XCode for iOS or Android Studio for Android.)
(Make sure npm command is installed first): 
> sudo apt install npm

We will install Expo CLI. (expo.io/learn)
> sudo npm install expo-cli --global

To create a new app:

> expo init forwords

(This is purely JavaScript, with no ios or android directories.)

To run the app: 

> cd forwords

> expo start

### 4. Express
Express is a web application framework for web/mobile applications (https://expressjs.com/en/starter/installing.html)

> npm install express --save

In the forwords directory,

> npm init

> npm install express --save

Once Node is installed, we can build our first webserver with Node.js (https://nodejs.org/en/docs/guides/getting-started-guide/)
* After that, run your web server using `node app.js`, visit http://localhost:3000, and you will see a message 'Hello World'

How does Node.js work?
https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5

### 5. SQL
> This was all written by Stephen Macomber, THANKS STEPHEN!

To install MySQL:

> sudo apt update

> sudo apt install mysql-server

How to make MySQL accessible without sudo privileges:

> sudo mysql -u root

> mysql> USE mysql;

> mysql> UPDATE user SET plugin='mysql_native_password' WHERE User='root';

> mysql> FLUSH PRIVILEGES;

> mysql> exit;

(https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost)

P.S. This site (https://www.w3schools.com/sql/default.asp) is really useful for learning SQL commands. The handy sidebar on the left is your friend! :)



# Our Linux VM: EurekaProjectVM on HyperV-Lab1
(Created through Hyper V Lab) It is a server VM, not a workstation VM. (AKA there is no UI.)

Root/Sudoer Privileges:

> first name: Eureka Project

> password: 4words!

ssh offcampus to @nabi.cs.gordon.edu and then ssh into anything on campus that has an ssh server, which means we would just need to put in the local IP of our server (10.100.150.128) to get in. 

We can upgrade to a workstation (have UI), there should be documentation somewhere for that. 

As of 11/3/18 1:05pm, it does not have a network connection yet so we cannot access it.



# Misc

** If Expo won't connect to VM **
The build on our VM was not accessible to my phone (even though we were both connected to GordonNET). So, what we did to fix this was the following:

Shutdown the VM, then cahgned the NEtowrk settings: we clicked "Attached to" and changed it from NAT to "Bridged Adapter".
