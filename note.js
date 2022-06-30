// [ ]npm init inside api
//[ ]install express mongo mongoose cors

//[ ] create server.js
//[ ] inser these code 
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors')

    const app = express();

    app.use(express.json())
    // enable json
    app.use(cors())
    // express is using cors (cross origin error)

// [] npm i -D nodemon
//  [ ] "scripts": {
    //   "start": "nodemon server.js"
    // },
// []terimianl  ->  mongo 
    // to connects to database(mongodb)
    // [ ]copy the string.. ie  mongodb://127.0.0.1:27017/
// [ ]code
    mongoose.connect("mongodb://127.0.0.1:27017/what-dinner", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // these are updates
    })
      .then(() => console.log("connected to DB"))
      .catch(console.error);

    app.listen(3001, () => console.log('Server started on port 3001'))
// [ ]npm start
// [ ] create model
      //create folder "models", file ie "MenuItems.js"
    //[ ] code
    const mongoose = require('mongoose');
            // using mongoose lib.

            const Schema = mongoose.Schema;
            // it has schema function

            const MenuItemsSchema = new Schema({
            text: {
            type: String,
            required: true
            },
            complete: {
            type: Boolean,
            default: false
            },
            timestamp: {
            type: String,
            default: Date.now()
            }
            })  
            const MenuItems = mongoose.model('MenuItems', MenuItemsSchema)

module.exports = MenuItems
            
// [ ] back to server.js  - CRUD create read update delete
      // [ ] read
      // code
      const MenuItems = require('./models/MenuItems');
      // getting frmom
      app.get('/menu-items', async (req, res) => {
      // make endpoint and with GET
        const menuItems = await MenuItems.find();
        // from file MenuItems, find all
        // await makes possitle to make next function wait
        res.json(menuItems)
        // respond with json of menuItems
      })
//  [ ] create
      //code
app.post('/menu-items/new', async (req, res) => {
  const menuItems = new MenuItems({
    text: req.body.text
    // look at the model and fill the requirement through req. - request

  });
  // it's lowercase menu...makeing new instance of built object(models)
  menuItems.save();
  res.json(menuItems);

      })
  

