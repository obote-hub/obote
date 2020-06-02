const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops, afk) => {
let fetched = ops.get(message.guild.id);

if(!fetched) return message.channel.send(`❌ **Nada tocando nesse server**`)

if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(`**Eu nao estou no mesmo canal de voz que você.** <:FeelsDonkMan:689656177520672873>`)


if(isNaN(args[0]) || args[0] > 200 || args[0] <  0) return message.channel.send('**Digite um numero valido de 1 a 200.** <:FeelsDonkMan:689656177520672873>')


fetched.dispatcher.setVolume(args[0]/100)

message.channel.send(`**Volume setado para:** \`${args[0]}\` <:FeelsDonkMan:689656177520672873> 👍 `)



}

module.exports.config = {
	name:  "volume",
	aliases: ["vol"]
}
