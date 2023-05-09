# 2 may 2023
Current issue: 
        * after enter right account name and password, user have to refresh in order to access their own account
        * search function 
        * More CSS
        * Log out button on navbar 
        * display user name instead of user id. 
        * filter by category 
        * Notify user 
        * greeting on navbar
        * "your listings" page for user to view the listings that are created by them

# 21/Apr/2023
Basically back-end is finished, can start to tidy up and can rename those routers. 
front-end router : 
                * User login - not yet finished
                * User register - basic functionality for demonstration 
                * item display - basic functionality for demonstration
                * item creation - basic functionality for demonstration
                * item deletion - basic functionality for demonstration
                * item edit - not yet finished
                * notifications - not yet started
                * offers function - not yet started 
  

# 9/Apr/2023
solved that issue because the way I use to establish connection with db is incorrect, now it's been fixed. And item and user account database and backend query functions done. still it has some minor bug need to be fixed eg : update either item or user account the information is not fully passed into database. <br> PS:Now will working on frontend query data from backend.<br>PS: everyone have a great break.   

# 3/Apr/2023

***MongooseError: Operation `items.findOne()` buffering timed out after 10000ms:***<br>
[Stack Overflow Useful Information](https://stackoverflow.com/questions/65408618/mongooseerror-operation-users-findone-buffering-timed-out-after-10000ms) (Tried, but not really solved the question)<br>

Also tried to add ***const item = await itemModel.findByID(id).timeout(3000)*** to the function, seems this function is not recognized by node. <br>
***const item = await itemModel.findById(id).maxTimeMS(60000).exec();*** doesn't return anything back from the database. 
# 31/Mar/2023
based on the guid of MongoDB's MERN-stack, I have set up the development environment for our team to work on in next few months. <Br>
<img scr="MERN.png" width = 300 height = 250>
