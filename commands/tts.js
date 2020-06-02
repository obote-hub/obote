const Discord = require('discord.js')
module.exports.run = async (client, message, args, ops, afk, db, prefix, mute, tts) => {
  if (!args[0])return message.channel.send("**Informe um texto para eu converter em tts.** <:FeelsDonkMan:689656177520672873>");
   let serverqueue = ops.get(message.guild.id)
   
   if(serverqueue)return message.channel.send("**Não posso converter textos para tts enquanto tem uma musica tocando.** <:FeelsDonkMan:689656177520672873>")
   
   
   let text = args.join(" ");
   
    if (text.length > 1024)return message.channel.send("**Por favor mande um texto menor, isso é muito pra mim!** <:FeelsDonkMan:689656177520672873>");

    const voiceChannel = message.member.voice.channel; 


     if (!voiceChannel)return message.channel.send("**Voce precisa entrar em um canal de voz antes!** <:FeelsDonkMan:689656177520672873>");
     
	let data = tts.get(message.guild.id) || {};
	if(!data.connection) data.connection = await message.member.voice.channel.join();
	if (!data.queue) data.queue = [];
	data.guildID = message.guild.id;
	data.queue.push({
     ttsmessage: text,
     url: `http://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${text.replace(' ', '%20')}`,
     requester: message.author.tag,
     annoucechannel:  message.channel.id,
     authorid: message.author.id,
})
	if(!data.dispatcher)  play(client, tts, data)
	else {
     let searchembed = new Discord.MessageEmbed()
      .addField(`TTS 🔉`, `Tts adicionado para a fila [<@${message.author.id}>] `, false)
      message.channel.send(searchembed)
}
    tts.set(message.guild.id, data)

}
module.exports.config = {
	name:  "tts",
	aliases: []
}



 async function play(client, tts, data){
	 let fetchedtts = tts.get(data.guildID)
	 const ytembed = new Discord.MessageEmbed()
	 .addField(`TTS 🔉`, `Tocando tts escrito por: [<@${data.queue[0].authorid}>]`, false)
      client.channels.cache.get(data.queue[0].annoucechannel).send(ytembed)
      data.dispatcher = await data.connection.play(data.queue[0].url, { quality: "highestaudio" })
      data.dispatcher.guildID = data.guildID;
      
      data.dispatcher.once('finish', function(){
        finish(client, tts, this)
})
    }

      function finish(client, tts, dispatcher){
        let fetched = tts.get(dispatcher.guildID)
        fetched.queue.shift();
        
        if(fetched.queue.length > 0){
          tts.set(dispatcher.guildID, fetched)
          play(client, tts, fetched)
            } else {
               tts.delete(dispatcher.guildID)
              
              let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
              if(vc) vc.leave()
            }
	      
}
