const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require("axios")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('apex')
	.setDescription('Get info about Apex Legends')
    .addSubcommand(subcommand => 
        subcommand
            .setName('map')
            .setDescription("Info about map rotation")
            .addStringOption(option =>
                option.setName('category')
                    .setDescription('The gif category')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Battle Royale', value: 'battle_royale' },
                        { name: 'Ranked', value: 'ranked' },
                        { name: 'Arena', value: 'arena' },
                    )))
    .addSubcommand(subcommand => 
        subcommand
            .setName('crafting')
            .setDescription("Info about crafting rotation")),
	async execute(interaction) {
        const subcommand = interaction.options.getSubcommand()
        // console.log(interaction.options.getSubcommand())
        // console.log(interaction.options.get('category').value)
		if (subcommand === 'map') {
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
                    const choice = interaction.options.get('category').value
					if (choice === 'arena') {
						mapRotationEmbed.title = "Arena Map Rotation"
						mapRotationEmbed.fields[0].value = `${data.arenas.current.map}\nTime left : ${data.arenas.current.remainingTimer}`
						mapRotationEmbed.fields[1].value = `${data.arenas.next.map}`
					}
					else if (choice === 'ranked') {
						mapRotationEmbed.title = "Ranked Battle Royale Map Rotation"
						mapRotationEmbed.fields[0].value = `${data.ranked.current.map}\nTime left : ${data.ranked.current.remainingTimer}`
						mapRotationEmbed.fields[1].value = `${data.ranked.next.map}`
					}
					else if (choice === 'battle_royale') {
						mapRotationEmbed.title = "Battle Royale Map Rotation"
						mapRotationEmbed.fields[0].value = `${data.battle_royale.current.map}\nTime left : ${data.battle_royale.current.remainingTimer}`
						mapRotationEmbed.fields[1].value = `${data.battle_royale.next.map}`
					}
					await interaction.reply({ embeds: [mapRotationEmbed] })
				}
				getMap()
			}
			catch(e) {
				await interaction.reply("Error, something is wrong :(")
			}
		}

        else if (interaction.options.getSubcommand() === 'crafting') {
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

					await interaction.reply({embeds : [craftingEmbed]})
				}
				getCrafting()
			}
			catch(e) {
				await interaction.reply("Error, something is wrong :(")
			}
        }
	}

}