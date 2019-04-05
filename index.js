const Discord = require("discord.js");
const client = new Discord.Client();
client.fs = require('fs');
client.config = require("./config.json");
client.colors = require('colors');

client.commands = new Discord.Collection();

// Lists Commands
client.fs.readdirSync('./commands/').forEach(folder => {
    client.fs.readdirSync(`./commands/${folder}/`).forEach(file => {
        name = file.replace(".js", "")
        client.commands.set(name, require(`./commands/${folder}/${name}.js`));
    })
})

// Export Events
client.on('message', (message) => require("./events/message.js")(client, message))
client.on('ready', () => require("./events/ready.js")(client))

// Some Functions
client.isEmpty = function (obj) {
    if (obj == null) return true;
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

client.noPermissions = function (message, command, perm) {
    message.channel.send(new Discord.RichEmbed().setTitle(':x: No Permissions').setColor(0xff0000).setDescription("You do not have permissions to use this command").setFooter("Command Failed").setAuthor(message.author.username, message.author.avatarURL).addField("Required Permission", "```"+perm+"```").setTimestamp());
}

client.login(client.config.token);
