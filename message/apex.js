const { default: axios } = require("axios")
const { MessageEmbed } = require('discord.js'); 

module.exports = {
    name : 'apex',
    async execute(message, args) {
		if (!args.length) {
			return message.channel.send(`You have not input any arguments, ${message.author} :(`)
		}
		else if (args[0] === 'map') {
			const mapRotationEmbed = {
				color: 0x0099ff,
				title: 'Lorem Ipsum',
				fields: [
					{
						name: 'Current',
						value: 'lorem ipsum',
					},
					{
						name: 'Next',
						value: 'lorem ipsum',
					},
				],
				timestamp: new Date(),
			};
			try {
				const getMap = async() => {
					const mapRotation = await axios.get(`https://api.mozambiquehe.re/maprotation?auth=${process.env.APEX_API_KEY}&version=2`)
					const data = mapRotation.data
					if (args[1] === 'arena') {
						mapRotationEmbed.title = "Arena Map Rotation"
						mapRotationEmbed.fields[0].value = `${data.arenas.current.map}\nTime left : ${data.arenas.current.remainingTimer}`
						mapRotationEmbed.fields[1].value = `${data.arenas.next.map}`
					}
					else if (args[1] === 'ranked') {
						mapRotationEmbed.title = "Ranked Battle Royale Map Rotation"
						mapRotationEmbed.fields[0].value = `${data.ranked.current.map}\nTime left : ${data.ranked.current.remainingTimer}`
						mapRotationEmbed.fields[1].value = `${data.ranked.next.map}`
					}
					else if (args[1] === undefined) {
						mapRotationEmbed.title = "Battle Royale Map Rotation"
						mapRotationEmbed.fields[0].value = `${data.battle_royale.current.map}\nTime left : ${data.battle_royale.current.remainingTimer}`
						mapRotationEmbed.fields[1].value = `${data.battle_royale.next.map}`
					}
					await message.channel.send({ embeds: [mapRotationEmbed] })
				}
				getMap()
			}
			catch(e) {
				await message.channel.send("Error, something is wrong :(")
			}
		}

        else if (args[0] === 'crafting') {
			try {
				const getCrafting = async() => {
					const craftingRotation = await axios.get(`https://api.mozambiquehe.re/crafting?auth=${process.env.APEX_API_KEY}`)
					const data = craftingRotation.data;
					const craftingEmbed = {
						color : "#1ce7db",
						title : "Current crafting rotation",
						fields : []
					}
					for (let i = 0; i < data.length; i++) {
						const bundle = {
							name : `${data[i].bundle} -- ${data[i].bundleType}`,
							value : `End Date : ${data[i].endDate}`
						}
						if (i !== 0) {
							craftingEmbed.fields.push({
								name: '\u200b',
								value: '\u200b',
								inline: false
							})
						}
						craftingEmbed.fields.push(bundle);

						craftingContent = data[i].bundleContent
						for (let j = 0; j < craftingContent.length; j++) {
							const content = {
								name : `${craftingContent[j].itemType.name}`,
								value : `${craftingContent[j].cost}`,
								inline : true
							}
							craftingEmbed.fields.push(content)
						}
					}

					await message.channel.send({embeds : [craftingEmbed]})
				}
				getCrafting()
			}
			catch(e) {
				await message.channel.send("Error, something is wrong :(")
			}
        }

		else {
			await message.channel.send("I don't understand what it means :(")
		}
    }
}