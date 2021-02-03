# spiced-final-project
A social network for photographers built with React and Material UI

# PhotoMe

## What's this?

This project was built during my attendance to the Spiced Academy's Web Development Bootcamp in Berlin as my final project.

## Why this?

After having gained experience with user interfaces and React I decided remake my social-network project (link here) and built a website with a nicer UI using Material UI. In addition to this, the whole app was built from the beginning with Redux and React Hooks, so the code was almost entirely rewritten.

## Technologies I used

- HTML5, CSS3
- File Storing with AWS S3
- Password resetting with AWS SES
- React.js
- Redux
- Material UI
- Node/Express
- PSQL

## Set Up

For security reasons it is required to own an AWS account and create a S3 Bucket and pass AWS credentials so the uploading middleware works.
I addition to the AMW set up it's necessary to create a new PSQL Database and edit the ```db.js``` file that can be found in this repo.
To make it run just clone the repository, install all the dependencies with ```npm install```. You need to run the server in you local directory with the command ```npm start```. In addition to it you will also need to run the client with ```npm run dev:client```. 

## Screenshots

### Registration

![Registration Page](https://raw.githubusercontent.com/l-legren/spiced-final-project/master/client/public/screenshot/registration.jpg)

### Homepage

![Homepage](https://raw.githubusercontent.com/l-legren/spiced-final-project/master/client/public/screenshot/homepage.jpg)

### Uploader 

![Uploader](https://raw.githubusercontent.com/l-legren/spiced-final-project/master/client/public/screenshot/upload_modal.jpg)

### Private messaging

![Private Messaging](https://raw.githubusercontent.com/l-legren/spiced-final-project/master/client/public/screenshot/private_messaging.jpg)

### Switch

![Filtering](https://raw.githubusercontent.com/l-legren/spiced-final-project/master/client/public/screenshot/filtering.jpg)
