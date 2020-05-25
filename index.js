
const ops = new Map();

const Discord = require('discord.js');
const client = new Discord.Client();
const queue = new Map();
client.afk = new Map();
client.work = new Map()
const ytdl = require("ytdl-core");
let prefix = '+'
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!, com ${client.guilds.cache.size} servers`);
});



client.on('ready', () => {
  const activities_list = [
   "BRUHBRUH",
   "+help",
   "https://obote.glitch.me/",
  `online em ${client.guilds.cache.size} severs`,
  `com ${client.users.cache.size} users`
    ]; // creates an arraylist containing phrases you want your bot to switch through.
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    
    }, 10000); // Runs this every 10 seconds.
});

client.on('message', async message => { 
 if (message.author.bot) return;
  
  
  
  let afkcheck = client.afk.get(message.author.id);
  if (afkcheck) return [client.afk.delete(message.author.id), message.channel.send(`<@${message.author.id}> **nao está mais afk.** `)];
  
  
  
  let mencao = message.mentions.members.first()
  if(mencao){
    let mentioned = client.afk.get(mencao.id);
     if (mentioned){
       var embed = new Discord.MessageEmbed()
       .setDescription(`<@${message.author.id}>: **${mentioned.tag}** Está afk: ${mentioned.reason}`)
      message.channel.send(embed);
}
}
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);
 if(message.content.startsWith(`${prefix}help`)){
    message.channel.send(`${message.author.username}, ${prefix},  https://oobote.glitch.me`);
   
   
  }  else  if(message.content.startsWith(`${prefix}play`)){
    
    const args = message.content.split(" ");
      if (!message.member.voice.channel) return message.channel.send("You have to be in a voicechannel first.");

    if (!args[1]) return message.channel.send("Please input a *URL* following the command!");
  
    let validate = await ytdl.validateURL(args[1]);

    if (!args[1].includes('https://')){
      const search = require('yt-search')
      search(args.join(' '), function(err, res) {
        if(err) return message.channel.send(`nao encontrei esse video`)
        let videos = res.videos.slice(0, 10);
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
     requester: message.author.tag,
     url: urll,
     annoucechannel:  message.channel.id    
})
          if(!data.dispatcher)  play(client, ops, data)
    
    else {
      message.channel.send(`Musica adicionada para a fila **${info.title}** | pedido por **${message.author.tag}**`)
}
    ops.set(message.guild.id, data)

          
})
})
} else {
  let info = await ytdl.getInfo(args[1])
  let data = ops.get(message.guild.id) || {};
    if(!data.connection) data.connection = await message.member.voice.channel.join();
    if (!data.queue) data.queue = []
    data.guildID = message.guild.id
   data.queue.push({
     songtitle: info.title,
     requester: message.author.tag,
     url: args[1],
     annoucechannel:  message.channel.id    
})
    if(!data.dispatcher)  play(client, ops, data)
    
    else {
      message.channel.send(`Musica adicionada para a fila **${info.title}** | pedido por **${message.author.tag}**`)
}
    ops.set(message.guild.id, data)
}

    
    


    
}
  
  
  if(message.content.startsWith(`${prefix}leave`)){
     if (!message.member.voice.channel) return message.channel.send("You have to be in a voicechannel first.");
     if (!message.guild.me.voice.channel) return message.channel.send("Eu preciso estar em um canal de voz antes..");
          
     
    message.guild.me.voice.channel.leave()
    message.channel.send(`Saindo do canal..`)


}
  
  
  if(message.content === prefix+'test'){
client.work.delete(message.author.id)
    
}
               
 const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
    if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
   if(command === "rainbow") {
   
   if(!message.guild) return;
    if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return;
   
   var role = message.mentions.roles.first();
 
      if(!role){
        return message.channel.send(`${message.author.username}, nao encontrei esse cargo`)

      }
     //https://prnt.sc/sef97y
      let botrole = message.guild.roles.cache.find(r => r.name === `obote`)
      if(!botrole){
        return message.channel.send(`um erro aconteceu, tente criar um cargo com o nome 'obote' com a função de adm e coloqueo no topo dos cargos`)
}
       
   if(role.position > botrole.position){
     let newem  = new Discord.MessageEmbed()
       .setDescription(`Nao consegui acessar esse cargo, tente me colocar no topo da lista de cargos`)
       .setAuthor(message.author.username)
     .setImage('https://i.imgur.com/7WCQ1pk.png')
        
    return await message.channel.send(newem)
} 
     var embed = new Discord.MessageEmbed()
    .setDescription(`Agora o cargo \`\`\`${role.name}\`\`\` esta no modo colorido.`)
   .setColor('PURPLE')
       .setAuthor(message.author.username)
  
     .setThumbnail('https://images.vexels.com/media/users/3/159522/isolated/preview/b5bfb038832092a6fa192321f0df7d97-arco-arco---ris-by-vexels.png')
        message.channel.send(embed)
    setInterval(function(){
       role.edit({
            color: "RANDOM"
        })
      
}, 5000)
  }
  if(command === 'meme') {
    
const randomPuppy = require('random-puppy');
    
    let reddits =  [
        "meme",
        "animemes",
        "MemesOfAnime",
        "animememes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals"
    ]
    
     let subreddit = reddits[Math.floor(Math.random() * reddits.length)];
    
    
    message.channel.startTyping();
    
    
    randomPuppy(subreddit).then(async url => {
            await message.channel.send({
                files: [{
                    attachment: url,
                    name: 'meme.png'
                }]
            }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err)); 
    
}
  if(command === 'afk'){
    let reason = args.join(' ') ? args.join(' ') : 'To afk. 🏃 💻 ';
    let afklist = client.afk.get(message.author.id);
    if (!afklist) {
        let construct = {
            id: message.author.id,
            reason: reason,
            tag: message.author.tag
        };
       
        client.afk.set(message.author.id, construct);
       var embed = new Discord.MessageEmbed()
       .setDescription(`**${message.author.tag}** está AFK:  \`\`${reason}\`\``)
        return message.channel.send(embed)
    }

}
  if(command === 'uptime'){
    
const ms = require("pretty-ms");
     const embed = new Discord.MessageEmbed()
    .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription(`**estou acordado por** \`\`${ms(client.uptime)}\`\`   🤓`)
    .setAuthor(client.user.tag, client.user.displayAvatarURL);
    message.channel.send(embed);
}else if(command === 'tts'){
  if (!message.member.voice.channel) return message.channel.send("Voce precisa entrar em um canal de voz antes");

    if (!args.join(' ')) return message.channel.send("Escreva a mensagem de tts a tocar.");


let a = args.join(' ')
a = a.replace(/ /g, '%20')
  a = a.replace(/,/g, '%2C')
    

   console.log(`https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${a}`)
    
    let connection = await message.member.voice.channel.join()
    let dispatcher  =  await connection.play(`https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${a}`)
  
  
  
}else if(command === 'cor'){
   var role = message.mentions.roles.first();
  
      if(!role){
        return message.channel.send(`${message.author.username}, voce nao especificou o cargo.`)

      }
     //https://prnt.sc/sef97y
  let botrole = message.guild.roles.cache.find(role => role.name === `obote`)
      if(role.position > botrole.position){
     let newem  = new Discord.MessageEmbed()
       .setDescription(`Nao consegui acessar esse cargo, tente me colocar no topo da lista de cargos`)
       .setAuthor(message.author.username)
     .setImage('https://i.imgur.com/7WCQ1pk.png')
        
    return await message.channel.send(newem)
}
  
  role.edit({
            color: `${args[1]}`
        })
  message.channel.send(`Mudei a cor do cargo \`\`${role.name}\`\` para \`\`${args[1]}\`\``)

   }
  if(command === 'songlist'){
    let pesquisado = ops.get(message.guild.id)
    if(!pesquisado) return message.channel.send(`Nao tem nada tocando nesse canal`)
    
    let queuee = pesquisado.queue
    let nowplayng = queuee[0]
    
    let resp = `\`\`\`fix\n Tocando agora:\n${nowplayng.songtitle} - Pedido por ${nowplayng.requester}\n\nLista de musicas:\n`
    
    for(var i = 1; i < queuee.length; i++){
      resp += `${i}) ${queuee[i].songtitle} - Pedido por: ${queuee[i].requester}\n`
}
    message.channel.send(`${resp}\n\`\`\``)
    
    
}
   

  
                    


  
});
    async function play(client, ops, data){
      client.channels.cache.get(data.queue[0].annoucechannel).send(`Tocando agora: **${data.queue[0].songtitle}** | pedido por **${data.queue[0].requester}**`)
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


client.login(process.env.BOT_TOKEN);
