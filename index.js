require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs')
const path = require('node:path');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// ~~~~~~~~~~~ CODE FOR EVENT HANDLING ~~~~~~~~~~~
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file)
	const event = require(filePath)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~ HANDLER FOR MESSAGE COMMANDS ~~~~~~~~~~~

client.commands = new Collection()
const MessageCommandsPath = path.join(__dirname, 'commands/message')
const messageCommandFiles = fs.readdirSync(MessageCommandsPath).filter(file => file.endsWith('.js'))

for (const file of messageCommandFiles) {
	const filePath = path.join(MessageCommandsPath, file)
	const command = require(filePath)
	client.commands.set(command.name, command)
}

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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~ HANDLER FOR SLASH COMMANDS ~~~~~~~~~~~
client.slashCommands = new Collection();
const slashCommandsPath = path.join(__dirname, 'commands/slash')
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'))

for (const file of slashCommandFiles) {
	const filePath = path.join(slashCommandsPath, file)
	const command = require(filePath)

	client.slashCommands.set(command.data.name, command)
}

client.on('interactionCreate', async interaction => {
	const command = client.slashCommands.get(interaction.commandName)
	try {
		if (interaction.isCommand()) {
			
			if (!command) return;
		
			await command.execute(interaction)
		}
	
		else if (interaction.isButton()) {
			if (interaction.customId == 'primary') {
				await interaction.reply('You pressed the primary button!')
			}
			else if (interaction.customId == 'success') {
				await interaction.reply('You pressed the success button!')
			}
		}
	
		else if (interaction.isSelectMenu()) {
			if (interaction.customId == 'select') {
				await interaction.reply(interaction.values[0])
			}
		}
	}
	catch(e) {
		console.error(e)
		await interaction.reply({content : 'There was an error while executing this command!', ephemeral: true})
	}
	
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

client.login(process.env.TOKEN);