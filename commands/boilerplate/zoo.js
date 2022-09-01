const {SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const mongoose = require('mongoose')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('zoo')
        .setDescription('Show your zoo!')
        .addSubcommand(subcommand => 
            subcommand
                .setName('add')
                .setDescription('Add animal')
                .addStringOption((option) => option
                    .setName('type')
                    .setDescription("Type of the animal")
                    .setRequired(true)
                    )
                .addStringOption((option) => option
                    .setName('name')
                    .setDescription("Name of the animal")
                    .setRequired(true)
                    )
                ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand()
        const type = interaction.options.getString('type')
        const name = interaction.options.getString('name')
        const infoEmbed = new EmbedBuilder();
        const animalSchema = mongoose.Schema({
            type : String,
            name : String,
        })
        const Animal = mongoose.Model('Animal', animalSchema)

        if (subcommand === 'add') {
            infoEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("NEW ANIMAL ADDED!")
                .setDescription("You just added an animal with this details:")
                .addFields(
                    {name: "Animal Type:", value: type.value},
                    {name: "Animal Name:", value: name.value},
                )
                .setFooter({text: 'Provided by Nara', iconURL: interaction.client.user.displayAvatarURL()})
        }


        await interaction.reply({embeds: [infoEmbed]})
    }
}