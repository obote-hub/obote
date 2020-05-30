const Discord = require('discord.js')
const ms = require("pretty-ms");
module.exports.run = async (client, message, args, ops, afk, db, prefix) => {
	let commands = client.commands.map(c => `\`${c.config.name}\``).join(', ')

	const embed = new Discord.MessageEmbed()
	.setTitle(`Meu prefixo é ${prefix}`)
	.setColor("CYAN")
	.setThumbnail(client.user.displayAvatarURL)
	.setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
	.addField(`Comandos gerais [${client.commands.size}]`, commands)
	.setFooter(`${message.guild.me.displayName} | Total commands: ${client.commands.size}`)
	message.channel.send(embed)
}

module.exports.config = {
	name:  "help",
	aliases: ["ajuda", "comandos"],
}

