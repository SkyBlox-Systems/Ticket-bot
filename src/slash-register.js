const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('../slappey.json');
const fs = require('fs');
const commands = [];
const commandList = new Map();


module.exports = () => {

	const commandFiles = fs.readdirSync('./src/Slash-Commands').filter(file => file.endsWith('.js'));

	// Place your client and guild ids here
	const clientId = '804663016124973076';

	for (const file of commandFiles) {
		const command = require(`./Slash-Commands/${file}`);
		commands.push(command.data.toJSON());
		commandList.set(command.data.name, command.run);
	}

	const rest = new REST({ version: '9' }).setToken(token);

		(async () => {
			try {
				console.log('Started refreshing application (/) commands.');
	
				await rest.put(
					Routes.applicationCommands(clientId),
					{ body: commands },
				);
	
				console.log('Successfully reloaded application (/) commands.');
			} catch (error) {
				console.error(error);
			}
		})();
	}


module.exports.commands = commandList;
