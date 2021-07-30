const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
//se tiver em produção coloca isso
//app.use(cors(cors({
//  origin: './src/pages/index.html'
//}));


app.get('/', function(req, res){
	res.sendFile(__dirname + "/src/pages/index.html");
	//res.sendFile(__dirname + "/html/index.html");
});

app.use((request, response, next) =>{
  const error = new Error('Not Found');
  error.status = 404;
  next(error)
});

app.use((error, request, response, next) =>{
  response.status(error.status || 500);
  response.json({ error: error.message})
});


const port = 3333;
app.listen(port, console.log('Server is running'));
