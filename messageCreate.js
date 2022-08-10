module.exports = {
    name : 'messageCreate',
    async execute(message, client) {
        if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase()

        if (!client.commands.has(command)) return;
        try {
            client.commands.get(command).execute(message, args)
        }
        catch(error) {
            console.error(error)
            message.channel.send('There is something wrong :(')
        }
    }
}