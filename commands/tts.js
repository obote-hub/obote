const Discord = require('discord.js')
module.exports.run = async (client, message, args, ops, afk) => {
  if (!args[0])return message.channel.send("**Informe um texto para eu converter em tts.** <:FeelsDonkMan:689656177520672873>");
   let serverqueue = ops.get(message.guild.id)
   
   if(serverqueue)return message.channel.send("**Não posso converter textos para tts enquanto tem uma musica tocando.** <:FeelsDonkMan:689656177520672873>")
   
   
   let text = args.join(" ");
   
    if (text.length > 1024)return message.channel.send("**Por favor mande um texto menor, isso é muito pra mim!** <:FeelsDonkMan:689656177520672873>");

    const voiceChannel = message.member.voice.channel; 


     if (!voiceChannel)return message.channel.send("**Voce precisa entrar em um canal de voz antes!** <:FeelsDonkMan:689656177520672873>");
     if (bot.voice.connections.has(voiceChannel.guild.id))return message.channel.send("**Ja estou convertendo tts!**  <:FeelsDonkMan:689656177520672873>");
   const connection = await voiceChannel.join();
   let url = `http://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${text.replace(' ', '%20')}`
   const dispatcher = connection.play(url);
    await message.react("🔉");
    dispatcher.once("finish", () => voiceChannel.leave());
    dispatcher.once("error", () => voiceChannel.leave());
}

module.exports.config = {
	name:  "tts",
	aliases: []
}
