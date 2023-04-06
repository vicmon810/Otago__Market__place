# 3/Apr/2023

***MongooseError: Operation `items.findOne()` buffering timed out after 10000ms:***<br>
[Stack Overflow Useful Information](https://stackoverflow.com/questions/65408618/mongooseerror-operation-users-findone-buffering-timed-out-after-10000ms) (Tried, but not really solved the question)<br>

Also tried to add ***const item = await itemModel.findByID(id).timeout(3000)*** to the function, seems this function is not recognized by node. <br>
***const item = await itemModel.findById(id).maxTimeMS(60000).exec();*** doesn't return anything back from the database. 
# 31/Mar/2023
based on the guid of MongoDB's MERN-stack, I have set up the development environment for our team to work on in next few months. <Br>
<img scr="MERN.png" width = 300 height = 250>
