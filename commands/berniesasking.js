const { SlashCommandBuilder } = require('@discordjs/builders');
const { process_berniesasking } = require('../index.node')
const logger = require('../logs/logger.js')

module.exports = {

    // Configure the slash command for gigachad
    data: new SlashCommandBuilder()
        .setName('berniesasking')
        .setDescription('Will caption Bernie for you!')
        .addStringOption(option => 
            option.setName('caption')
            .setDescription('Text to add to the bottom of the image.')
            .setRequired(true)
        ),

    // Processes Caption whenver Gigachad is invoked
    async execute(interaction) {

        let bottom = interaction.options.getString('caption').toLowerCase()

        if (bottom.length > 80) {
            interaction.reply({ content: "Invalid! Caption should never be longer than 80 characters." , ephemeral: true })
        } 
        else {
            let path = process_berniesasking(bottom)
            logger.update_template_logs("berniesasking")
    
            interaction.reply({ content: " ", files: [path] })
        }
    }
}