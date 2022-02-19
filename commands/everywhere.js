const { SlashCommandBuilder } = require('@discordjs/builders')
const { process_everywhere } = require('../index.node')
const logger = require('../logs/logger.js')

module.exports = {

    // Configure the slash command for skepticalkid
    data: new SlashCommandBuilder()
        .setName('everywhere')
        .setDescription('Will caption that meme with buzz and woody for you!')
        .addStringOption(option => 
            option.setName('top_caption')
            .setDescription('Text to add to the top of the image, and on the bottom with "Everywhere" appended.')
            .setRequired(true)
        ),

    // Slash Command Input is Processed Here
    async execute(interaction) {

        let top = interaction.options.getString('top_caption').toUpperCase()
        let bottom = top + " EVERYWHERE"

        if (top.length > 80 || bottom.length > 80) {
            interaction.reply({ content: "Invalid! Neither caption should be longer than 80 characters." ,ephemeral: true })
        } 
        else {
            let path = process_everywhere(top, bottom)
            logger.update_template_logs("everywhere");
    
            interaction.reply({ content: " ", files: [path] })
        }
    }
}