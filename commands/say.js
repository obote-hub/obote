const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops, afk) => {

 message.channel.send(`${args.join(' ')}`)


}

module.exports.config = {
	name:  "say",
	aliases: ["falar"],
	description: `Me faz falar alguma coisa, qualquer coisa.... qualquer uma.... menos aquilo... <:cmonBruh:717903591930855503>`
}
