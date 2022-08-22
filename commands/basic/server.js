const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Show server info!'),
    async execute(interaction) {
        const infoEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setImage(interaction.guild.iconURL())
            .setTitle("SERVER INFO!")
            .addFields(
                {name: "Server Name:", value: interaction.guild.name},
                {name: "Member Count:", value: interaction.guild.memberCount.toString()},
            )
            .setFooter({text: 'Provided by Nara', iconURL: interaction.client.user.displayAvatarURL()})
        await interaction.reply({ embeds: [infoEmbed] })
    }
}