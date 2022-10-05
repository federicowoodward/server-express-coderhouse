const servidor = require('./src/app.js')
const PORT = process.env.PORT || 8080

servidor.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
.on("error", (err) => {console.log(err)})