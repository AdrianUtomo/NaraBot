const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
	.setDescription('Get info about a user or a server!')
	.addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('server')
			.setDescription('Info about the server')),
	async execute(interaction) {
		try {
			const subcommand = interaction.options.getSubcommand()
			if (subcommand === 'user') {
				await interaction.reply(interaction.options.get('target').user.username)
			}
			console.log(interaction.options.getSubcommand())
		}
		catch(e) {
			console.log(e)
		}
	}
}