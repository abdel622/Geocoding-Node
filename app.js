const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

const app = express()
const port = 5000

// Set Templating Enginge
app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({ extended: false }))

app.use('/static', express.static('public'));

// Navigation

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/', (req, res) => {
  

  let url = `https://nominatim.openstreetmap.org/search/${req.body.exp}?format=json&addressdetails=1&limit=1`
  fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
    .then(data => { 
      const coor = data[0]
      res.render('home',
          {coor}
      )
    })
      
})

app.listen(process.env.PORT || port, () => console.info(`App listening on port`))