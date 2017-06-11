# assignment_okodin
Build a dating app so Viking thunder gods can find love &lt;3

Name: Christian Florez


what remains?
views/likes

for likes ->
add like button on every profile
takes you to 

localhost/like POST with invisible form input
Like.findOrCreate

Like is two ids
likerId (userId)
likeeId (userId)

Viewer is same structure

then
localhost/likes
find all where likee is current session user
Then get profiles for likers
easy peasey lemon cheesy

Like.findAll({
    where: { likerId:1 }
  }).then(lg);