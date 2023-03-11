const {SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const mongoose = require('mongoose')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('zoo')
        .setDescription('Show your zoo!')
        .addSubcommand(subcommand => 
            subcommand
                .setName('show')
                .setDescription('Show all animals')
                )
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
        const Animal = require("../../models/animal.js")

        if (subcommand === 'add') {
            try {
                const addedAnimal = new Animal({
                    type : type,
                    name : name
                })
                await addedAnimal.save()
                const infoEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("NEW ANIMAL ADDED!")
                    .setDescription("You just added an animal with this details:")
                    .addFields(
                        {name: "Animal Type:", value: addedAnimal.type},
                        {name: "Animal Name:", value: addedAnimal.name},
                    )
                    .setFooter({text: 'Provided by Nara', iconURL: interaction.client.user.displayAvatarURL()})
                
                await interaction.reply({embeds : [infoEmbed]})
                
            }
            catch(e) {
                await interaction.reply("Error, something is wrong :(")
            }
        }
        else if (subcommand === 'view') {
            try {
                
            }
            catch(e) {

            }
        }
    }
}