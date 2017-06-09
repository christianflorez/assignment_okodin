# assignment_okodin
Build a dating app so Viking thunder gods can find love &lt;3

Name: Christian Florez

Attack Plan:

What we need to implement:
Login/Logout/SignUp
Profile View - Should be blank at first, then "edit" to start populating
Search - Should this be get or post? Probably get...?
Likes
Views

So what entities do I have?
User
  - username
  - email
  - Profile (very complex), deal with later
Likes Join Table
Views Join Table


What do my routes look like?

DONE okodin.com/login && logout sessions etc. < - authentication
okodin.com/profiles <- general profiles path. should not actually do anything.
okodin.com/profiles/:id <- this is where you go after logging in (for the moment. also where search takes you.
okodin.com/profiles/:id/edit <- check to see if your id matches this id, then allow page. otherwise redirect with warning
okodin.com/profiles/:id/?_method=delete <- allow you to delete profile + user account
okodin.com/search <- get method with query strings for parsing info
okodin.com/likes <- just one simple get which checks session userid
okodin.com/views <- just one simple get which checks session userid as well


So what's next?
Let's build a profile model and associated nonsense.

So what does profile have?

Profile = one to one relationship
id: Integer
userId: foreignKey
aboutMe: text
talents: text
favoriteThings: text
whyMessage: text
gender: string (radio button)
marital status: string
height: integer (will parse server side)
body type: string
kids: boolean
occupation: string
location: foreignKey


Location: oneToMany (many users, one location for each user)
id: Integer
city: string (just random word like Lorem or whatever)
distance: integer

  -> so you'd have like "Lorem City, 5 miles". Lorem City, 20 miles. Etc. etc. etc. Each id is basically a city name and distance from that city


So next steps:
-set up session routes to grab user profile and redirect them to it
-set up profiles route to show user profile
-set up profiles edit route to allow changing user profile

User.findOne({include:[{model:Profile}]}).then(lg)