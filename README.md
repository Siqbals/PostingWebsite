# Posting Website

## overview:
this application is designed to aid programmers in posting questions and replying to questions 
it runs on an account based system, where users sign up and post questions
each post is stored in a channel, dedicated to its post contents (e.g. python would post python related questions)

other features:
-admin controls via admin login (user: admin, pass: adminlogin), which allows the deletion of users, posts, channels, and replies 
-search feature to search for specific question (queries based on question title contents)
-view channel and view posts associated to that channel 

## implementation:
front-end - uses the React Javascript library along with standard HTML
\n
back-end:
  Javascript is uses to access the database and perform modifications on it, as well manage CORS policy overrides 
  MySQL database is used to store user login information, channels, posts, and replies 



