import express from 'express'
import path from 'path'
import config from 'config'

const app = express()
const examplesPath = path.resolve(__dirname, '..', '..', 'examples')

app.use(express.static(examplesPath))

const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
