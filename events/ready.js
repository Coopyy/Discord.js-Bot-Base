module.exports = (client) => {
    console.log()
    console.log(`"${client.user.username}" is now Online.`.green);
    console.log(`Users: ${client.users.size}`.yellow)
    console.log(`Channels: ${client.channels.size}`.yellow)
    console.log(`Guilds: ${client.guilds.size}`.yellow)
    console.log()
}