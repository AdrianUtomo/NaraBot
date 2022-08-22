const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Show user info!')
        .addUserOption((option) =>
            option.setName('user')
            .setDescription("The User you'd like the info shown")
            .setRequired(true)
            ),
    async execute(interaction) {
        const user = interaction.options.getUser('user')
        const infoEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setImage(user.displayAvatarURL())
            .setTitle("USER INFO!")
            .addFields(
                {name: "Member Name:", value: user.username},
                {name: "Tag:", value: user.tag},
            )
            .setFooter({text: 'Provided by Nara', iconURL: interaction.client.user.displayAvatarURL()})

        await interaction.reply({embeds: [infoEmbed]})
    }
}