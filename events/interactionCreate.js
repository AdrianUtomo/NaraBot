module.exports = {
    name : "interactionCreate",
    async execute(interaction, client) {
    	try {
            if (interaction.isCommand()) {
                const command = client.slashCommands.get(interaction.commandName)
                if (!command) return;
                await command.execute(interaction)
            }
        
            else if (interaction.isButton()) {
                console.log('the interaction is a button!')
                if (interaction.customID == 'primary') {
                    await interaction.reply('You pressed the primary button!')
                }
                else if (interaction.customID == 'success') {
                    await interaction.reply('You pressed the success button!')
                }
            }
        
            else if (interaction.isSelectMenu()) {
                if (interaction.customId == 'select') {
                    await interaction.reply(interaction.values[0])
                }
            }
        }
        catch(e) {
            console.error(e)
            await interaction.reply({content : 'There was an error while executing this command!', ephemeral: true})
        }
    }
}