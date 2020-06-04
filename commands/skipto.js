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
        const fetched = ops.get(message.guild.id);
        if (!fetched) return message.channel.send('❌ **Nada tocando nesse server**');
        
        
        if(!args[0]){
	return message.channel.send('**Coloque um numero valido, use ${prefix}queue para ver o numero da musica**');
	}
	if(isNaN(args[0])){
	return message.channel.send('**Coloque um numero valido, use ${prefix}queue para ver o numero da musica**');
	}
	
        if (args[0] < 1 && args[0] >= fetched.queue.length) {
        return message.channel.send('**Coloque um numero valido, use ${prefix}queue para ver o numero da musica**');
        }
        
         try {
        fetched.queue.splice(0, args[0] - 2);
        fetched.connection.dispatcher.end();
        return;
      } catch {
          fetched.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("*Algo deu errado!**");
      }
 	
	      
}




module.exports.config = {
	name:  "skipto",
	aliases: ["pularpara", "jumpto"],
	description: `Pula para a musica informada pelo numero`
}
