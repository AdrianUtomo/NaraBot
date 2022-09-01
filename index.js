require('dotenv').config();
const { Client, GatewayIntentBits , Collection } = require('discord.js');
const fs = require('fs')
const path = require('node:path');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const functions = fs.readdirSync("./functions").filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync("./commands");

client.slashCommands = new Collection();
client.commands = new Collection();

(async () => {
	for (file of functions) {
		require(`./functions/${file}`)(client)
	}
	client.dbLogin()
	client.handleEvents(eventFiles, "../events")
	client.handleCommands(commandFolders, './commands')
	
	client.login(process.env.TOKEN);

})();