const Discord = require('discord.js')
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.GOOGLE_API_KEY);

module.exports.run = async (client, message, args, ops, afk) => {


  if(!message.member.voice.channel) return message.channel.send("Voce precisa estar em um canal de voz antes.");

  if(!args[0]) return message.channel.send("Coloque um url valido!");
  
  let validate = await ytdl.validateURL(args[0]);


  if(!validate){
     
  if(args[0].includes('playlist')){

  const playlist = await youtube.getPlaylist(args[0])
  const videos = await playlist.getVideos();
  

  for (const video of Object.values(videos)) {
    let info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${video.id}`)
    let data = ops.get(message.guild.id) || {};
    if(!data.connection) data.connection = await message.member.voice.channel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    data.queue.push({
    songtitle: video.title,
    thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    requester: message.author.tag,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    annoucechannel:  message.channel.id,
    authorid: message.author.id
})
  if(!data.dispatcher) play(info, client, ops, data, true)
   

    ops.set(message.guild.id, data)

	  
	  
  }
	let embed = new Discord.MessageEmbed()
      .addField(`Music`, `Playlist [${playlist.title}](${args[0]}) adicionada para a fila. [<@${message.author.id}>] `, false)
       return message.channel.send(embed)
  } else {
  
    
   message.channel.send("Coloque um url valido!");
  }






}
  
}

 async function play(info, client, ops, data, playlist = false){
	 if(data.dispatcher){
		 if (playlist) return undefined;
		 else{
       let eeembed = new Discord.MessageEmbed()
      .setThumbnail(`https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`)
      .addField(`Music`, `Musica adicionada para a fila [${info.title}](${args[0]}) [<@${message.author.id}>] `, false)
      message.channel.send(eeembed)
		 }
		 return undefined;
	 }
	 const ytembed = new Discord.MessageEmbed()
	 .setThumbnail(data.queue[0].thumbnail)
	 .addField(`Music`, `Tocando agora [${data.queue[0].songtitle}](${data.queue[0].url})  [<@${data.queue[0].authorid}>]`, false)
      client.channels.cache.get(data.queue[0].annoucechannel).send(ytembed)
      data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: 'audioonly'}))
      data.dispatcher.guildID = data.guildID;
      
      data.dispatcher.once('finish', function(){
        finish(info, client, ops, this, playlist = false)
})
    }

      function finish(info, client, ops, dispatcher, playlist = false){
        let fetched = ops.get(dispatcher.guildID)
        fetched.queue.shift();
        
        if(fetched.queue.length > 0){
          ops.set(dispatcher.guildID, fetched)
          play(info, client, ops, fetched, playlist= false)
            } else {
               ops.delete(dispatcher.guildID)
              
              let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
              if(vc) vc.leave()
            }
	      
}


module.exports.config = {
	name:  "teste",
	aliases: ["test", "t"]
}
