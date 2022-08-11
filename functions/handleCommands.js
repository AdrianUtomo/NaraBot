const fs = require('fs')
const path = require('node:path');
module.exports = (client) => {
    client.handleCommands = async (commandFolders, commandsPath) => {
        // Slash command handler
        const slashCommandFolders = commandFolders.filter(file => file !== 'message')
        for (const folder of slashCommandFolders) {
            const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`)
                client.slashCommands.set(command.data.name, command)
            }
        }
        // message command handler
        const messageCommandFiles = fs.readdirSync(path.join(commandsPath, 'message')).filter(file => file.endsWith('.js'))
        for (const file of messageCommandFiles) {
            const command = require(`../commands/message/${file}`)
            client.commands.set(command.name, command)
        }
    }
}