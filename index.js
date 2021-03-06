const express = require('express')
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const LinkedIssues = require('./models/linkedissues')
const port = 8089
var mongoDB = 'mongodb+srv://cata:cata@cluster0.wcbqw.mongodb.net/first?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/linkedissues', async (req, res) => {
    let newLinkedIssues = req.body
    var addLinkedIssues=new LinkedIssues({ name:newLinkedIssues.name})
    await LinkedIssues.create(addLinkedIssues)
    res.send(newLinkedIssues)
})

app.get('/linkedissues', async (req, res) =>{
    // const record= await Project.find({'type':req.query.type}).exec()
    const record= await LinkedIssues.find({})
    res.json(record)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
