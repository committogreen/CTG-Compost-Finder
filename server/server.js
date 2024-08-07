//require('dotenv').config();
const express= require('express')
const exphbs= require('express-handlebars');
const bodyParser = require('body-parser');
const path= require('path');
const app= express();
app.use(express.json());
app.use(bodyParser.json());

const cors = require('cors')
const stateRouter=require('./routes/stateroute')
const cityRouter= require('./routes/cityroute.js')
const countyRouter= require('./routes/countyroute.js')
const dropOffRouter=require('./routes/dropoffroute.js')
const microhaulerRouter= require('./routes/microhaulerroute.js')
const smartBinRouter= require('./routes/smartbinroute.js')
const db= require('./config/db.js');
//test DBB
db.authenticate()
    .then(() => console.log('DATABASE connected..'))
    .catch(err => console.log('Error:' +err))

const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));

app.get("/",(req,res)=>{
    res.send('Commit to Green Backennnd screen')
});

app.use('/state',stateRouter)
app.use('/city',cityRouter)
app.use('/county',countyRouter)
app.use('/dropOff',dropOffRouter)
app.use('/microHauler',microhaulerRouter)
app.use('/smartBin',smartBinRouter)
const PORT= process.env.PORT || 5000;
app.listen(PORT, 5000,()=> {console.log("server started on port 5000")})