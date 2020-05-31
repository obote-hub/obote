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
  console.log(video)
  
   





  }
  } else {
  
    
   message.channel.send("Coloque um url valido!");
  }







  }
}




module.exports.config = {
	name:  "teste",
	aliases: ["test", "t"]
}
