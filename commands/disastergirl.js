const { SlashCommandBuilder } = require('@discordjs/builders')
const { process_disastergirl } = require('../index.node')
const logger = require('../logs/logger.js')

module.exports = {

    // Configure the slash command for skepticalkid
    data: new SlashCommandBuilder()
        .setName('disastergirl')
        .setDescription('Will caption Disaster Girl for you!')
        .addStringOption(option => 
            option.setName('top_caption')
            .setDescription('Text to add to the top of the image')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('bottom_caption')
            .setDescription('Text to add to the bottom of the image')    
            .setRequired(true)
        ),

    // Slash Command Input is Processed Here
    async execute(interaction) {

        let top = interaction.options.getString('top_caption').toUpperCase()
        let bottom = interaction.options.getString('bottom_caption').toUpperCase()

        if (top.length > 80 || bottom.length > 80) {
            interaction.reply({ content: "Invalid! Neither caption should be longer than 80 characters." ,ephemeral: true })
        } 
        else {
            let path = process_disastergirl(top, bottom)
            logger.update_template_logs("disastergirl");
    
            interaction.reply({ content: " ", files: [path] })
        }
    }
}