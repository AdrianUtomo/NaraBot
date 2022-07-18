const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Show user info!'),
    async execute(interaction) {
        await interaction.reply('This is user info!')
    }
}