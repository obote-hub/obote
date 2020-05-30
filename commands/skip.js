const Discord = require('discord.js')
const ytdl = require("ytdl-core");
module.exports.run = async (client, message, args, ops, afk, prefix) => {

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('Me desculpa mas voce precisa estar em um canal de voz para usar esse comando.');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**Voce precisa estar no mesmo canal de voz que eu!**");
          }
        const serverQueue = ops.get(message.guild.id);
        if (!serverQueue) return message.channel.send('❌ **Nada tocando neste server!**');
        serverQueue.connection.dispatcher.end();
        return message.channel.send('⏩ Som skippado com sucesso')

	      
}




module.exports.config = {
	name:  "skip",
	aliases: ["pular"]
}
