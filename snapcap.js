
// - Imports - // ----------------------------------

// idk what these do
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Require the necessary discord.js classes
const {
    Client,
    Intents,
    Collection
} = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

// - tokens & ID - // ----------------------------------

const {
    token, 
    client_id,
    guild_id,
} = require('./token.js');

const guild_only = false;

// - Configuring Slash Commands - // --------------------

// -> Stores names 
// -> Uses names to get slash command data
// -> Sets that data to Discord.js

command_names = [];
if (process.argv[2] != undefined) {``
    command_names = [ process.argv[2] ]
}
else {
    command_names = [
        'gigachad', 'skepticalkid', 'everywhere', 'skeletonwaiting', 'berniesasking', 'disastergirl'
    ]
}
const commands = []
client.commands = new Collection();
for ( c in command_names ) {
    console.log('registered ' + './commands/' + command_names[c]);
    let module = require('./commands/' + command_names[c])
    commands.push(module.data.toJSON())
    client.commands.set(module.data.name, module)
}

// - Logic - // ------------------------------------

// When the client is ready, this only runs once
client.once('ready', () => {
    console.log('Ready!');
    // Registering the commands in the client
    const rest = new REST({version: '9'}).setToken(token);
    (async () => {
        try {
            if (!guild_id) {
                await rest.put(
                    Routes.applicationCommands(client_id), {
                        body: commands
                    },
                );
                console.log('Successfully registered application commands globally');
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(client_id, guild_id), {
                        body: commands
                    },
                );
                console.log('Successfully registered application commands for development guild');
            }
        } catch (error) {
            if (error) console.error(error);
        }
    })();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Login to Discord with your client's token
client.login(token);