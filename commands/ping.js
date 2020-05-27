const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops, afk) => {

var ping = Date.now() - message.createdTimestamp + " ms";


 message.channel.sendMessage("Seu ping é `" + `${Date.now() - message.createdTimestamp}` + " ms`");
}

module.exports.config = {
	name:  "ping",
	aliases: ["pong", "pg"]
}