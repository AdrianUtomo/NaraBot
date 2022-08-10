const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adrian')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Hakim!')
    }
}