const Discord = require('discord.js')
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
module.exports.run = async (client, message, args, ops, afk, prefix) => {


  if (!message.member.voice.channel) return message.channel.send("Você precisa estar em um canal de voz antes.");

    if (!args[0]) return message.channel.send("Coloque um url valido!");
  
    let validate = await ytdl.validateURL(args[0]);

    if (!args[0].includes('https://')){
      const search = require('yt-search')
      search(args.join(' '), function(err, res) {
        if(err) return message.channel.send(`Não encontrei esse video`)
        let videos = res.videos.slice(0, 10);
      if(videos.length <= 0){
          return message.channel.send(`Não encontrei esse video`)
      }
        let resp = '';
        for(var i in videos){
          resp += `**[${parseInt(i)+1}]:** \`${videos[i].title} (${videos[i].duration.timestamp})\`\n`
}
        resp += `\n Escolha um numero entre \`1-${videos.length}\``
        message.channel.send(resp)
        
        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0 
        const collector = message.channel.createMessageCollector(filter)
        collector.videos = videos;
        collector.once('collect', async function(m) {
          let urll = this.videos[parseInt(m.content)-1].url
          let info = await ytdl.getInfo(urll)
          let data = ops.get(message.guild.id) || {};
         if(!data.connection) data.connection = await message.member.voice.channel.join();
          if (!data.queue) data.queue = []
          data.guildID = message.guild.id
             data.queue.push({
     songtitle: info.title,
     thumbnail: `https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`,
     requester: message.author.tag,
     url: urll,
     annoucechannel:  message.channel.id,
     authorid: message.author.id		     
})
          if(!data.dispatcher)  play(client, ops, data)
    
    else {
     let searchembed = new Discord.MessageEmbed()
      .setThumbnail(`https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`)
      .addField(`Music`, `Adicionado para a fila [${info.title}](${urll}) [<@${message.author.id}>] `, false)
      message.channel.send(searchembed)
}
    ops.set(message.guild.id, data)

          
})
})

} else {
	
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
   if(!data.dispatcher)  play(client, ops, data, playlist, video)
    
    else {
     let embed = new Discord.MessageEmbed()
      .setThumbnail(`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`)
      .addField(`Music`, `Musica [${video.title}](https://www.youtube.com/watch?v=${video.id}) da playlist [${playlist.title}](${args[0]}) adicionada para a fila. [<@${message.author.id}>] `, false)
      message.channel.send(embed)
}
    ops.set(message.guild.id, data)

	  
	  
  }
  } else {
  
    
   message.channel.send("Coloque um url valido!");
  }






} else {
	let info = await ytdl.getInfo(args[0])
    let data = ops.get(message.guild.id) || {};
    if(!data.connection) data.connection = await message.member.voice.channel.join();
    if (!data.queue) data.queue = []
    data.guildID = message.guild.id
    data.queue.push({
    songtitle: info.title,
    thumbnail: `https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`,
    requester: message.author.tag,
    url: args[0],
    annoucechannel:  message.channel.id,
    authorid: message.author.id
})
    if(!data.dispatcher)  play(client, ops, data)
    
    else {
      let embed = new Discord.MessageEmbed()
      .setThumbnail(`https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`)
      .addField(`Music`, `Musica adicionada para a fila [${info.title}](${args[0]}) [<@${message.author.id}>] `, false)
      message.channel.send(embed)
}
    ops.set(message.guild.id, data)
}
	
}
	

}




 async function play(client, ops, data){
	 const ytembed = new Discord.MessageEmbed()
	 .setThumbnail(data.queue[0].thumbnail)
	 .addField(`Music`, `Tocando agora [${data.queue[0].songtitle}](${data.queue[0].url})  [<@${data.queue[0].authorid}>]`, false)
      client.channels.cache.get(data.queue[0].annoucechannel).send(ytembed)
      data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: 'audioonly', quality: "highestaudio" }))
      data.dispatcher.guildID = data.guildID;
      
      data.dispatcher.once('finish', function(){
        finish(client, ops, this)
})
    }

      function finish(client, ops, dispatcher){
        let fetched = ops.get(dispatcher.guildID)
        fetched.queue.shift();
        
        if(fetched.queue.length > 0){
          ops.set(dispatcher.guildID, fetched)
          play(client, ops, fetched)
            } else {
               ops.delete(dispatcher.guildID)
              
              let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
              if(vc) vc.leave()
            }
	      
}




module.exports.config = {
	name:  "play",
	aliases: ["tocar", "p"]
}
