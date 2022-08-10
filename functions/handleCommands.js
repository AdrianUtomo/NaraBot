const fs = require('fs')
const path = require('node:path');
module.exports = (client) => {
    client.handleCommands = async (commandFolders, commandsPath) => {
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`)
                client.slashCommands.set(command.data.name, command)
            }
        }
    }
}