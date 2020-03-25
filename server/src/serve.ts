import express from 'express'
import path from 'path'
import config from 'config'

const app = express()
const distPath = path.resolve(__dirname, '..', '..', 'dist')
const examplesPath = path.resolve(__dirname, '..', '..', 'examples')

app.use('/dist', express.static(distPath))
app.use(express.static(examplesPath))

const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
