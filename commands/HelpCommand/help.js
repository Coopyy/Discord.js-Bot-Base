const Discord = require("discord.js");
module.exports = (client, message, args) => {
    function sendEmbed() {
        const helpEmbed = new Discord.RichEmbed()
        if (client.config.helpColor != "") { helpEmbed.setColor(client.config.helpColor) }
        helpEmbed.setTitle(client.user.username + " Commands")
        if (client.config.helpUrl != "") { helpEmbed.setURL(client.config.helpUrl) }
        helpEmbed.setAuthor(message.author.username, message.author.avatarURL)
        if (client.config.helpDescription != "") { helpEmbed.setDescription(client.config.helpDescription + "\n\nFor help on a specific command or category, use \n`"+client.config.prefix+"help [command]`.") } else {helpEmbed.setDescription("\nFor help on a specific command or category, use \n`"+client.config.prefix+"help [command]`.")}
        helpEmbed.setThumbnail(client.user.avatarURL)
        helpEmbed.setTimestamp()
        client.fs.readdirSync('./commands/').forEach(folder => {
            if (folder != "HelpCommand") {
                var commandlist = "";
                client.fs.readdirSync(`./commands/${folder}/`).forEach(file => {
                    name = file.replace(".js", "")
                    var commandName = require(`../../commands/${folder}/${file}`);
                    if ((name != "template") && (name != "help")) { 
                        commandlist += "`"+name+"`, ";
                    }
                })
                helpEmbed.addField(folder, commandlist) 
            }
        })
    
        message.channel.send({ embed: helpEmbed });
    }

    function commandHelp(description, name, syntax, category, permissions) {
        if (permissions == "" | !permissions) {
            message.channel.send(new Discord.RichEmbed().setTitle(`Command: ${client.config.prefix}${name}`).setDescription(description + "\n\n**Category:** `"+category+"`\n**Syntax:** `"+client.config.prefix+name+" "+syntax+"`").addField("Required Permissions", "*None*").setColor(client.config.helpColor));
        } else {
            message.channel.send(new Discord.RichEmbed().setTitle(`Command: ${client.config.prefix}${name}`).setDescription(description + "\n\n**Category:** `"+category+"`\n**Syntax:** `"+client.config.prefix+name+" "+syntax+"`").addField("Required Permissions", "`"+permissions+"`").setColor(client.config.helpColor));
        }
    }
    
    if (args.length == 0) {
        sendEmbed()
    } else {
        client.fs.readdirSync('./commands/').forEach(folder => {
            var commandlist = "";
            client.fs.readdirSync(`./commands/${folder}/`).forEach(file => {
                name = file.replace(".js", "")
                var commandName = require(`../../commands/${folder}/${file}`);
                if (args[0] === name) {
                    commandHelp(commandName.description, name, commandName.syntax, folder, commandName.permissions)
                }
            })
        })
    }
}