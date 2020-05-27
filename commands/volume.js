const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops, afk) => {
let fetched = ops.get(message.guild.id);

if(!fetched) return message.channel.send(`Não tem nada tocando nesse servidor`)

if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(`ERRO: [ID: 834], eu nao estou no mesmo canal de voz que voce.`)


if(isNaN(args[0]) || args[0] > 200 || args[0] <  0) return message.channel.send('Escolha um numero de 0-200')


fetched.dispatcher.setVolume(args[0]/100)

message.channel.send(`Volume setado para: \`${args[0]}\``)



}

module.exports.config = {
	name:  "volume",
	aliases: ["vol"]
}