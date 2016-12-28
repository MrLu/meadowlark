var express = require('express');
var app = express();

//端口号
app.set('port',process.env.PORT || 3000);

//视图引擎
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//静态资源文件
app.use(express.static(__dirname + '/public'));

var fortunes = [
"Conquer your fears or they will conquer you.", "Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple."
];

app.get('/', function(req,res){
	res.type('text/plain');
	res.send('Meadowlark Travel');
});

app.get('/about', function(req,res){
	// res.type('text/plain');
	// res.send('About Meadowlark Travel');
	var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render('about',{fortune:randomFortune});
});

app.get('/about/contact',function(req,res){
	res.type('text/plain')
	res.send('AboutContact Meadowlark Travel');
});

app.get('/about/directions',function(req,res){
	res.type('text/plain')
	res.send('AboutDirections Meadowlark Travel');
});

app.get('/about*', function(req,res){
	res.type('text/plain');
	res.send('About Meadowlark Travel');
});

app.use(function(req,res){
	res.status(404);
	// res.type('text/plain');
	// res.send('404 - Not Found');
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	// res.type('text/plain');
	// res.send('500 - Server Error');
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});




