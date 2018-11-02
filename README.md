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
* some kind of SQL server manager.

We will use 'create-react-native-app' as opposed to 'react-native init' because of the following reasons expressed on the CRNA's github page:
* "**Minimal "Time to Hello World"**: Create React Native App should reduce the setup time it takes to try building a mobile app to the absolute minimum, ideally on par with React web development (especially as seen with Create React App).
* **Develop on Your Device**: It should be easy to develop on a physical device when you want to test how your app feels and responds to inputs.
* **One Build Tool**: If you just want to get started with React Native, you shouldn't need to install Xcode, Android Studio, NDKs, or mess with environment variables.
* **No Lock-In**: You can always "eject" to your own build setup if you need to write custom native code or modify how your app is built."
(source: https://github.com/react-community/create-react-native-app)

# 1. Node.j
First, we must install the latest version of Node.js.
  https://nodejs.org/en/
  
# 2. Yarn
Next, we will install yarn (a package manager) (https://yarnpkg.com/en/docs/install#debian-stable)
> curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

> echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

> sudo apt-get update && sudo apt-get install yarn
  
Test that it works by:

> yarn --version
  
Add the ability to execute the CRNA command:

> yarn global add create-react-native-app@1.0.0
  (the @1.0.0 is the version of CRNA to install, we could potentially do a newer version)

# 3. Expo CLI
(Expo is a platform that helps build fully functional React Native apps without having to write native code; AKA no XCode for iOS or Android Studio for Android.)
We will install Expo CLI. (https://docs.expo.io/versions/latest/introduction/installation)
> npm install -g expo-cli
  
# 4. Create-React-Native-App
Then, to create a new app, we will this command in our project directory (https://github.com/react-community/create-react-native-app):
> create-react-native-app forwords --scripts-version 1.14.0

(1.14.10 is the version of the package "react-native-scripts" that is the engine that runs out RN app while in development.   You can find this package in the package.json file)

> cd forwords

> yarn start
  
> expo init 

  (This is purely JavaScript, with no ios or android directories.)
  
> npm start
  
  



