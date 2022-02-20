
/*
    Deprecated - Used for Testing only
*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { get_num_cpus } = require('../index.node')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(interaction) {
        interaction.reply({ content: "Number of CPUS: " + get_num_cpus() })
    }
}



