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

sequelize model:create --name Location --attributes "name:string distance:integer"


Location: oneToMany (many users, one location for each user)
id: Integer
city: foreignKey
distance: integer

  -> so you'd have like "Lorem City, 5 miles". Lorem City, 20 miles. Etc. etc. etc. Each id is basically a city name and distance from that city

City: oneToMany
id: Integer
name: string


So next steps:
-set up validations on sequelize models for profile update
-set up put route to update user profile properly
-create associations for cities/locations/profileIDs
-followed by working on search
-finally close out with views/likes

Profile Id has one location. Location has Many Profile Ids.
many: user.js/location
one: skills.js/profileId
One to MAny

User.find()
Location.findAll({
  where: {cityId: 3},
  include: [{
    all: true,
    include: [{ all: true }]
  }]
}).then(data => {console.log(JSON.stringify(data.Profiles, null, 2))})

Location.findAll({
  where: {cityId: 3},
   include: [{
    all: true,
    include: [{ all: true }]
  }]
}).then(data => {
  data.forEach(el => { console.log(JSON.stringify(el.Profiles, null, 2))})
})
above query should help us figure out location stuff


Profile.findAll({
  where: {
    locationId: [1, 4, 6]
  }
}).then(lg)

Tomorrow:
Include more validations for profile/location/etc.
Then, build out search functionality. This should actually not be that bad :)
First, have a "default search" where if no query string is found, search with this
So
Profile.findAll(where distance lte Y and location = yourLocation)
Then use bootstrap Tabs to flesh out other stuff
Then the last part is to build out views/likes

Location.findAll({
          where: { cityId: 20 }
        }).then(lg)

        Location.findAll({
          where: { 
            cityId: 1,
            distance: { $lte: 90 },
            distance: { $gte: 20 }
          }
        }).then(lg)