const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
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
            .setDescription("Info about crafting rotation"))
	.addSubcommand(subcommand => 
		subcommand
			.setName('news')
			.setDescription("Latest Apex Legends News")),
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

        else if (subcommand === 'crafting') {
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
				await interaction.reply("Error, something was wrong :(")
			}
        }

		else if (subcommand === 'news') {
			try {
				const getNews = async () => {
					const apexNews = await axios.get(`https://api.mozambiquehe.re/news?auth=${process.env.APEX_API_KEY}`)
					const data = apexNews.data
					const newsTitle = []
					for (let i = 0; i < 5; i++) {
						newsTitle.push(data[i].title)
					}
					const newsTitleEmbed = new MessageEmbed()
					.setColor('#1ce7db')
					.setTitle("5 Latest Apex Legends News from the API")
					.setDescription(
						newsTitle.map((i) => {
							return `${newsTitle.indexOf(i)+1}. ${i}`
						}).join("\n")
					)
					const filter = (i) => i.member.id === interaction.member.id && i.content <= 5 && i.content > 0

					await interaction.reply({embeds : [newsTitleEmbed]})
						.then(() => {
							interaction.channel.awaitMessages({filter, max: 1, time: 10000, errors: ['time']})
								.then(collected => {
									const news = data[collected.first()]
									const showNews = new MessageEmbed()
										.setColor('#1ce7db')
										.setTitle(news.title)
										.setDescription(news.short_desc)
										.setURL(news.link)
										.setImage(news.img)
									interaction.followUp({embeds : [showNews]})
								})
								.catch(() => {
									interaction.followUp("You didn't input anything")
								})
						})
				}
				getNews()
			}
			catch(e) {
				console.log(e)
				await interaction.reply("Error, something was wrong :(")
			}
		}
	}

}