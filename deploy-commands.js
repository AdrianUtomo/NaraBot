require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const path = require('node:path');
const fs = require('fs')

const slashCommands = [];
const slashCommandsTest = [];
const commandsPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(commandsPath).filter(folder => folder !== 'boilerplate' && folder !== 'message')
const commandFoldersTest = fs.readdirSync(commandsPath).filter(folder => folder !== 'message')

for (const folder of commandFoldersTest) {
	const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'))
	for (const file of commandFiles) {
		const filePath = path.join(__dirname, `commands/${folder}/${file}`)
		const command = require(filePath);
		slashCommandsTest.push(command.data.toJSON())
	}
}

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'))
	for (const file of commandFiles) {
		const filePath = path.join(__dirname, `commands/${folder}/${file}`)
		const command = require(filePath);
		slashCommands.push(command.data.toJSON())
	}
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		// await rest.put(
		// 	Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
		// 	{ body: slashCommandsTest },
		// );

		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: slashCommands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();