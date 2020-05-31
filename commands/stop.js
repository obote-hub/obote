const Discord = require('discord.js')
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
module.exports.run = async (client, message, args, ops, afk, prefix) => {
 const { channel } = message.member.voice;
if (!channel) return message.channel.send('Me desculpa mas voce precisa estar em um canal de voz para usar esse comando!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**Voce precisa estar no mesmo canal de voz que eu.!**");
          }
        const serverQueue = ops.get(message.guild.id);
        if (!serverQueue) return message.channel.send('❌ **Nada tocando nesse server**');
        
        serverQueue.dispatcher.end()
	let data = ops.get(message.guild.id)
	let dispatcher = data.guildID
        ops.delete(dispatcher)
        await message.react("👋")
        return message.channel.send('👋 **Disconectado**')
        
	      
}




module.exports.config = {
	name:  "stop",
	aliases: ["parar"]
}
