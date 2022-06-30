const { Client, Intents, DiscordAPIError, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config();
// const {token, prefix} = require('./config.json')

client.commands = new Collection()
const fs = require('fs')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`User Info : ${interaction.user.username}`);
    	await interaction.channel.send(interaction.user.avatarURL())
	}
});

client.on('messageCreate', async message => {
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
})

client.login(process.env.TOKEN);