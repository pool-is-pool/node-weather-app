const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./geocode")
const forecast = require("./forecast")


const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
console.log(__dirname)
const assetsDirectoryPath = path.join(__dirname, "../assets")
const viewsPath = path.join(__dirname, "/templates/views")
const partialsPath = path.join(__dirname, "/templates/partials")

// setup handlebars engine 
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(assetsDirectoryPath)) 

app.get("", (req,res) => {
    res.render("index", {
        title: "Weather App",
        name: "dynamic viewing engine",
        footer: "made by ps"
    })
})

app.get("/help", (req,res) => {
    res.render("help",{
        title: "help page",
        name: "help message",
        footer: "made by ps"
    })
})

app.get("/about", (req,res) => {
    res.render("about",{
        title: "about page",
        name: "about message",
        footer: "made by ps"
    }) 
})

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude , longitude , (error , forecastData) => {
            if (error) {
                return res.send ({ error })
            }

            res.send({
                forecast: forecastData,
                location ,
                address: req.query.address
            })
        })

    })
})

app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get("/help/*", (req,res) => {
    res.render("404_page" , {
        title : "error" ,
        error_msg : "Help article not found",
        footer : "made by ps"
    })
})

app.get("*",(req,res) => {
    res.render("404_page" , {
        title : "error" ,
        error_msg : "Page not found",
        footer : "made by ps"
    })
})


app.listen(port, () => {
    console.log("Server is up on " + port)
})



// app.com
// app.com/help
// app.com/about
// app.com/weather