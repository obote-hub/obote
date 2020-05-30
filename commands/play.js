const Discord = require('discord.js')
const ytdl = require("ytdl-core");
module.exports.run = async (client, message, args, ops, afk) => {


  if (!message.member.voice.channel) return message.channel.send("Voce precisa estar em um canal de voz antes.");

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
     annoucechannel:  message.channel.id    
})
          if(!data.dispatcher)  play(client, ops, data)
    
    else {
     let searchembed = new Discord.MessageEmbed()
      .setDescription(`Musica adicionada para a fila **${info.title}** [<@${message.author.id}>] `)
      .setThumbnail(`https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`)
      message.channel.send(searchembed)
}
    ops.set(message.guild.id, data)

          
})
})

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
    annoucechannel:  message.channel.id    
})
    if(!data.dispatcher)  play(client, ops, data)
    
    else {
      let embed = new Discord.MessageEmbed()
      .setDescription(`Musica adicionada para a fila **${info.title}** [<@${message.author.id}>] `)
      .setThumbnail(`https://i.ytimg.com/vi/${info.video_id}/maxresdefault.jpg`)
      message.channel.send(embed)
}
    ops.set(message.guild.id, data)
}

}

 async function play(client, ops, data){
	 const ytembed = new Discord.MessageEmbed()
	 .setDescription(`Tocando agora: **${data.queue[0].songtitle}** | pedido por **${data.queue[0].requester}**`)
         .setImage(data.queue[0].thumbnail)
      client.channels.cache.get(data.queue[0].annoucechannel).send(ytembed)
      data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: 'audioonly' }))
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
