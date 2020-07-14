//importing packages
import express from 'express';
import bodyParser from 'body-parser';

//importing routes
import Item from './Routes/item';
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/', function(req, res) {
	res.send('Hello World');
});

app.use('/item', Item);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
