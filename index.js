const { Client, Intents, DiscordAPIError, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const {token, prefix} = require('./config.json')

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
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase()

	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args)
	}
	catch(error) {
		console.error(error)
		message.channel.send('There is something wrong :(')
	}

	// if (command === "hello") {
	// 	message.channel.send('hi')
	// }

	// else if (command === "apex") {
	// 	if (!args.length) {
	// 		return message.channel.send(`You have not input any arguments, ${message.author} :(`)
	// 	}
	// 	else if (args[0] === 'map') {
	// 		try {
	// 			const mapRotationEmbed = {
	// 				color: 0x0099ff,
	// 				title: 'Lorem Ipsum',
	// 				fields: [
	// 					{
	// 						name: 'Current',
	// 						value: 'lorem ipsum',
	// 					},
	// 					{
	// 						name: 'Next',
	// 						value: 'lorem ipsum',
	// 					},
	// 				],
	// 				timestamp: new Date(),
	// 			};
	// 			const getMap = async() => {
	// 				const mapRotation = await axios.get(`https://api.mozambiquehe.re/maprotation?auth=${apexAPIKey}&version=2`)
	// 				const data = mapRotation.data
	// 				if (args[1] === 'arena') {
	// 					mapRotationEmbed.title = "Arena Map Rotation"
	// 					mapRotationEmbed.fields[0].value = `${data.arenas.current.map}\nTime left : ${data.arenas.current.remainingTimer}`
	// 					mapRotationEmbed.fields[1].value = `${data.arenas.next.map}`
	// 				}
	// 				else if (args[1] === 'ranked') {
	// 					mapRotationEmbed.title = "Ranked Battle Royale Map Rotation"
	// 					mapRotationEmbed.fields[0].value = `${data.ranked.current.map}\nTime left : ${data.ranked.current.remainingTimer}`
	// 					mapRotationEmbed.fields[1].value = `${data.ranked.next.map}`
	// 				}
	// 				else {
	// 					mapRotationEmbed.title = "Battle Royale Map Rotation"
	// 					mapRotationEmbed.fields[0].value = `${data.battle_royale.current.map}\nTime left : ${data.battle_royale.current.remainingTimer}`
	// 					mapRotationEmbed.fields[1].value = `${data.battle_royale.next.map}`
	// 				}
	// 				await message.channel.send({ embeds: [mapRotationEmbed] })
	// 			}
	// 			getMap()
	// 		}
	// 		catch(e) {
	// 			await message.channel.send("Error, something is wrong :(")
	// 		}
	// 	}
	// }
})

client.login(token);