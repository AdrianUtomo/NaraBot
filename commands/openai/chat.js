const { EmbedBuilder , SlashCommandBuilder } = require('discord.js')
const { default: axios } = require("axios")
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('ask me anything!')
    .addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')
			.setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply()
        const userInput = interaction.options.get('input').value;
        const shoot = await axios.post('https://api.openai.com/v1/chat/completions', {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": userInput}]
        },
        {
            headers : {
              "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            }
        })
        const content = shoot.data.choices[0].message.content
        await interaction.editReply({content: `**Question : ${userInput}\nAsked By : ${interaction.user}**${content}`})
    }
}