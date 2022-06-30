const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config()


const app = express();
const port = process.env.PORT || 3001;
// console.log(process.env.PORT)
app.use(express.json())
app.use(cors());

// mongoose.connect("mongodb://127.0.0.1:27017/what-dinner")
mongoose.connect("mongodb+srv://johan123:.z!BS8r.fCGtBgG@cluster0.ryytm.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("connected to DB"))
  .catch(console.error);

const MenuItems = require('./models/MenuItems');

app.get('/menu-items', async (req, res) => {
  const menuItems = await MenuItems.find();
  res.json(menuItems)
})

app.post('/menu-items/new', async (req, res) => {
  const menuItems = new MenuItems({
    text: req.body.text
    // look at the model and fill the requirement through req. - request

  });
  // it's lowercase menu...makeing new instance of built object(models)
  menuItems.save();
  res.json(menuItems);

})
      
app.delete('/menu-items/delete/:id', async (req, res) => {
  const result = await MenuItems.findByIdAndDelete(req.params.id);
  
  res.json(result)
})

app.listen(port, () => console.log('Server started on port '+ port))
  




