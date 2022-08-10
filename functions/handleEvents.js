module.exports = (client) => {
    client.handleEvents = async (eventFiles, eventsPath) => {
        for (const file of eventFiles) {
            const event = require(`${eventsPath}/${file}`)
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}