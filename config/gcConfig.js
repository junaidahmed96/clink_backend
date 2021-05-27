const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, './TurtleTreeLabsWebsite-db44f3ef3826.json')
const GOOGLE_CLOUD_PROJECT_ID = 'turtletree-labs-website'; 


const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: GOOGLE_CLOUD_PROJECT_ID,
})

module.exports = storage