// const {apexAPIKey} = require('../config.json')
const { default: axios } = require("axios")

module.exports = {
    name : 'apex',
    async execute(message, args) {
        if (!args.length) {
			return message.channel.send(`You have not input any arguments, ${message.author} :(`)
		}
		else if (args[0] === 'map') {
			try {
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
					else {
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

        }
    }
}