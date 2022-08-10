const mongoose = require('mongoose')
module.exports = (client) => {
    client.dbLogin = async () => {
        await mongoose.connect('mongodb://localhost:27017/economyNara')
            .then(() => {
                console.log('CONNECTION OPEN!')
            })
            .catch(err => {
                console.log('THERE WAS AN ERROR!')
                console.log(err)
            })
    }
}