var express = require('express');
var partials = require('express-partials'); // https://github.com/publicclass/express-partials
var bodyParser = require('body-parser');
var app = express();

app.use(partials());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));

var articles = [
    { title: 'Bernie! Bernie!', body: '#feelthebern' },
    { title: 'Trump for change!', body: 'Make America Great Again' },
    { title: 'Brian Hague founds the Daily Planet', body: 'Wow! Amazing! Such good news!' }
];

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/articles', function(req, res) {
    res.render('articles/index', { articles: articles });
});

app.get('/articles/new', function(req, res) {
    res.render('articles/new');
});

app.get('/articles/:index', function(req, res) {
    var index = parseInt(req.params.index);
    if (index < articles.length && index >= 0) {
        res.render('articles/show', { article: articles[req.params.index] });
    } else {
        res.send('Error');
    }
});

app.post('/articles', function(req, res) {
    articles.push(req.body);
    res.redirect('/articles');
});

app.get('/about', function(req, res) {
    res.render('about');
});


//THIS ONE WORKS
app.delete('/article/:id', function(req, res) {
  var articleToDelete = req.params.id;
  articles.splice(articleToDelete,1);
  res.send({message: 'success'});
});

app.get('/articles/edit/:id', function(req, res) {
    res.render('articles/edit', { article: articles[req.params.id], idx: req.params.id });
});

//THIS ONE WORKS TOO
app.put('/articles/edit/:id', function(req, res) {
    var articleToEditId = parseInt(req.params.id);
    articles[articleToEditId].title = req.body.title;
    articles[articleToEditId].body = req.body.body;
    res.send({message: 'success'});
});


app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
