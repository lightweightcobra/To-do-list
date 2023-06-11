const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

let items =[];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {

    let day = date.getDate();
   res.render("list",{newList: items, listTitle: day});

});

app.post('/', (req, res) => {

    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});

app.get('/work', (req, res) => {
    let today = new Date();
   let options = {
        weekday:"long",
        day:"numeric",
        month:"long"
   };


   let day = today.toLocaleDateString("en-US", options);
    res.render("list",{listTitle: "Work", newList:workItems});
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.post('/work',(req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
})