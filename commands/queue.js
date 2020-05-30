module.exports.run = async (client, message, args, ops, afk, db, prefix) => {
               
 let fetched = ops.get(message.guild.id);

 if(!fetched)return message.channel.send('Não tem nada tocando nesse server')

 	let queue = fetched.queue;
    let nowplay = queue[0];

    let resp = `\`\`\`nimrod ⬐ tocando agora\n1) ${nowplay.songtitle}\n⬑ tocando agora\n\n`

    for(var i = 1; i < queue.length; i++){
    	resp += `${i}) ${queue[i].songtitle}\n`;

    }
  

    resp += `\n\n Esse é o final da lista de musica!\n Use ${prefix}play para ouvir mais. \`\`\``
  message.channel.send(resp)
}

module.exports.config = {
	name:  "queue",
	aliases: ["songlist", "songs", "musicas", "musiclist", "queuesongs"]
}
