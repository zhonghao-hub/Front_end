Mongo Commands:
1. mongod
2. mongo
3. help
4. show
    > show dbs<!-- show  all databases mongo have -->
    admin   0.000GB
    config  0.000GB
    local   0.000GB

    > show collections <!-- show collections in current db(demo) -->
    dogs

5. use
    if exist: open it
    else: creat one and open it 
    > use demo
    switched to db demo

6. insert
    > db.dogs.insert({name: "Rusty", breed: "Mutt"})<!-- 这里的db指的是current database(demo) -->
    WriteResult({ "nInserted" : 1 })

7. find
    > db.dogs.find()
    { "_id" : ObjectId("5f763f04054dc31a8735018c"), "name" : "Rusty", "breed" : "Mutt" } 
    { "_id" : ObjectId("5f764087054dc31a8735018d"), "name" : "Lucy", "breed" : "Mutt" }  
    { "_id" : ObjectId("5f764094054dc31a8735018e"), "name" : "Lulu", "breed" : "Poodle" }
    > db.dogs.find({name: "Rusty"})
    { "_id" : ObjectId("5f763f04054dc31a8735018c"), "name" : "Rusty", "breed" : "Mutt" }

8. update
    > db.dogs.update({name: "Rusty"}, {$set: {name: "Tater", isCute: true}})
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
    > db.dogs.find()
    { "_id" : ObjectId("5f763f04054dc31a8735018c"), "name" : "Tater", "breed" : "Mutt", "isCute" : true }
    { "_id" : ObjectId("5f764087054dc31a8735018d"), "name" : "Lucy", "breed" : "Mutt" }
    { "_id" : ObjectId("5f764094054dc31a8735018e"), "breed" : "Lab" }
    { "_id" : ObjectId("5f7640a1054dc31a8735018f"), "name" : "Lulu" }

9. remove
    > db.dogs.remove({breed: "Lab"})
    WriteResult({ "nRemoved" : 1 })
    > db.dogs.find()
    { "_id" : ObjectId("5f763f04054dc31a8735018c"), "name" : "Tater", "breed" : "Mutt", "isCute" : true }
    { "_id" : ObjectId("5f764087054dc31a8735018d"), "name" : "Lucy", "breed" : "Mutt" }
    { "_id" : ObjectId("5f7640a1054dc31a8735018f"), "name" : "Lulu" }

10. drop()
    delete the whole dogs collections
    > db.dogs.drop()
    true



Mongoose:

