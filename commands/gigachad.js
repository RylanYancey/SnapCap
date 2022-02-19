const { SlashCommandBuilder } = require('@discordjs/builders');
const { process_gigachad } = require('../index.node')
const logger = require('../logs/logger.js')

module.exports = {

    // Configure the slash command for gigachad
    data: new SlashCommandBuilder()
        .setName('gigachad')
        .setDescription('Will caption a Gigachad for you!')
        .addStringOption(option => 
            option.setName('caption')
            .setDescription('Text to add to the bottom of the image.')
            .setRequired(true)
        ),

    // Processes Caption whenver Gigachad is invoked
    async execute(interaction) {

        let bottom = interaction.options.getString('caption').toUpperCase()

        if (bottom.length > 80) {
            interaction.reply({ content: "Invalid! Caption should never be longer than 80 characters." , ephemeral: true })
        } 
        else {
            let path = process_gigachad(bottom)
            logger.update_template_logs("gigachad")
    
            interaction.reply({ content: " ", files: [path] })
        }
    }
}