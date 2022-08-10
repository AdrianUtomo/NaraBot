const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('button')
    .setDescription('Choose a button'),
    buttonID : 'button',
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Primary')
                    .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('success')
                .setLabel('Success')
                .setStyle('SUCCESS')
            )

        await interaction.reply({content : 'Choose a Button!', components: [row]})
    },
}