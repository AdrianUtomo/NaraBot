const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('gif')
	.setDescription('Sends a random gif!')
	.addStringOption(option =>
		option.setName('category')
			.setDescription('The gif category')
			.setRequired(true)
			.addChoices(
				{ name: 'Funny', value: 'HAHA THIS IS SO FUNNY' },
				{ name: 'Meme', value: 'I HAVE SOME DANK MEMES' },
				{ name: 'Movie', value: 'YOU SHOULD WATCH THIS' },
			)),
	async execute(interaction) {
		await interaction.reply(interaction.options.get('category').value)
	}

}