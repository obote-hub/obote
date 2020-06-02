const Discord = require('discord.js')
module.exports.run = async (client, message, args, ops, afk, db, prefix, mute, tts) => {
   const spotify = require("spotify-url-info");
  /*
   let track = await spotify.getData(args[0]);
   let preview = await spotify.getPreview(args[0])
   
   
   
   
   
   let data = ops.get(message.guild.id) || {};
    if(!data.connection) data.connection = await message.member.voice.channel.join();
    if (!data.queue) data.queue = []
    data.guildID = message.guild.id
    data.queue.push({
    songtitle: preview.title,
    thumbnail: preview.image,
    requester: message.author.tag,
    url: preview.url,
    annoucechannel: message.channel.id,
    authorid: message.author.id,
    duration: video.duration,
    audio: preview.audio
    
})
   
   
   */
   
   const voiceChannel = message.member.voice.channel;
	const connection = await voiceChannel.join();
	const dispatcher = connection.play(args[0])
   
   
   
   
   
 
	
}

module.exports.config = {
	name:  "teste",
	aliases: ["test", "testado"]
}
