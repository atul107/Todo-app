var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://todo:todo@cluster0.uzlze.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/todo', {useNewUrlParser: true});

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var itemOne = Todo({item: 'Buy flower'}).save(function(err){
    // if(err) throw err;
    console.log('item saved');
});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'code'}];
var urlEncodeedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app) {
    app.get('/todo', function(req, res) {
        res.render('todo', {todos: data});
    });
    app.post('/todo', urlEncodeedParser, function(req, res) {
        data.push(req.body);
        res.json(data);
    });
    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
};