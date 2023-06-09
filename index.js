const express = require('express');
const app = express();
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
// Define a route for the home page
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.listen(8088, () => {
  console.log('listening on port 8088');
});
