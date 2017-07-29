# OkOdin

[![OkOdin](http://i.imgur.com/8JpTJha.png)](https://hidden-chamber-99115.herokuapp.com/)

## Introduction
OkOdin is a light clone of OkCupid, leveraging PostgreSQL and Node/Express to create an app that mimics many of OkCupid's functionality.

## Technologies Used
PostgreSQL/Sequelize, Node, Express

## Getting Started
Clone the repository and install dependencies. Set up a local Postgres database on your machine under the name `assignment_okodin_development`. Verify that it is working by running `npm run seeds` to populate the database with mock users.

## Deployment Link
A deployed version of this project may be found [here.](https://hidden-chamber-99115.herokuapp.com/search)

Login with the following information:

Username: foobar1@baz.org

Email: foobar1

You may replace the digit in both username and email with any other digit up to 7999.

## Additional Notes
OkOdin mimics many of OkCupid's features. Try change the user profile, or liking a different user. You can also try opening different user's profiles, then logging into that user and checking the views tab. You'll notice that OkOdin saves all these views to the database. 

This project uses advanced SQL inserts and joins in order to enable this functionality. Additionally, models are atomicized in order to allow for more granular searching, while also opening up future queries to be more dynamic. 
