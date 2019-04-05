module.exports = (client, message) => {
    if (message.author.bot) return;

    // Return if message dosent start with a prefix 
    if (message.content.indexOf(client.config.prefix) != 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Regular commands check
    if (client.commands.has(command)) {
        console.log(`[${message.guild.name}] ${message.author.tag}: "${message}"`)
        if (command === "help") return client.commands.get(command)(client, message, args);
        client.fs.readdirSync('./commands/').forEach(folder => {
            client.fs.readdirSync(`./commands/${folder}`).forEach(file => {
                name = file.replace(".js", "")
                if (command == name) {
                    var commandName = require(`../commands/${folder}/${file}`);
                    if (!commandName.permissions) {
                        client.commands.get(command)(client, message, args);
                    } else if (commandName.permissions == "DEV_ONLY" && (message.author.id == "246086107832254465")) {
                        client.commands.get(command)(client, message, args);
                    } else if (commandName.permissions != "DEV_ONLY") {
                        if (message.channel.permissionsFor(message.member).has(commandName.permissions)) client.commands.get(command)(client, message, args);
                    } else {
                        client.noPermissions(message, command, commandName.permissions)
                    }
                }
            });
        });
    }
}