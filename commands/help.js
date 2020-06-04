const Discord = require('discord.js')
const ms = require("pretty-ms");
module.exports.run = async (client, message, args, ops, afk, db, prefix, mute, tts) => {
	let commands = client.commands.map(c => `\`${c.config.name}\``).join(', ')
        if(!args[0]){
        const embed = new Discord.MessageEmbed()
	.setTitle(`Meu prefixo é ${prefix}`)
	.setColor("CYAN")
	.setThumbnail(client.user.displayAvatarURL)
	.setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
	.addField(`Comandos gerais [${client.commands.size}]`, commands)
	.setFooter(`${message.guild.me.displayName} | Total commands: ${client.commands.size}`)
	message.channel.send(embed)
	} else {
		let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
                if(!command) return message.channel.send(`**Não encontrei o comando ${args[0]}**   <:peepoShrug:692362555607482388>`)
		 command = command.config;
                const commandembed = new Discord.MessageEmbed()
                .setThumbnail(client.user.displayAvatarURL)
                .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
                .setTitle(`${prefix}${command.name}`)
		.addField(`Nome`, `${command.name}`)
                .addField(`Descrição`, `${command.description}`)
		.addField(`Apelidos`, `\`${command.aliases || "Nenhum"}\``)
                .setFooter(`${message.guild.me.displayName} | Total commands: ${client.commands.size}`)
               message.channel.send(commandembed)
	}
	
}

module.exports.config = {
	name:  "help",
	aliases: ["ajuda", "comandos"],
	description: "Informa todos os comandos disponiveis e suas funções"
}

