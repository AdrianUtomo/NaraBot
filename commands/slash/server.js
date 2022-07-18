const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Show server info!'),
    async execute(interaction) {
        await interaction.reply('This is server info!')
    }
}