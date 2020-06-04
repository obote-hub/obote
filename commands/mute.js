const Discord = require('discord.js')
const ms = require("ms");
module.exports.run = async (client, message, args, ops, afk, db, mute) => {
	 if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("MUTE_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Voce nao tem permissao para usar esse comando.");
    }

   let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

   if (!user) return message.channel.send("Voce precisa mencionar um usuario");
   
    let role = message.guild.roles.cache.find(r => r.name === "Mutado");
    let bot = message.guild.members.cache.get(client.user.id).roles.highest;
    
    if (!role) return message.channel.send("Nao consegui encontrar um cargo de mute, crie um chamado \`Mutado\`");
    if (role.position > bot.position) return message.channel.send("O cargo de mutado é maior que o meu, mude isso nas configurações");
    
    let time = args[1];
    
    if (!time) {
      if (user.roles.cache.has(role.id)) return message.channel.send("Esse user ja esta mutado.");
      await (user.roles.add(role.id).catch(err => message.channel.send(`Algo deu errado: ${err}`)))
      return message.channel.send(`${user.user.tag} Agora esta mutado.`);
    } else {
      if (user.roles.cache.has(role.id)) return message.channel.send("Esse user ja esta mutado.");
      await (user.roles.add(role.id).catch(err => message.channel.send(`Algo deu errado: ${err}`)))
      
      let timer = setTimeout(function() {
        user.roles.remove(role.id).catch(err => message.channel.send(`Algo deu errado: ${err}`));
        message.channel.send(`${user.user.tag} Agora esta desmutado.`);
      }, ms(time))
      
      mute.set(user.user.id, timer);
      message.channel.send(`${user.user.tag} agora esta mutado por **${ms(ms(time), {long: true})}**`);
    }





}

module.exports.config = {
	name:  "mute",
	aliases: ["mutar"],
	description: `Muta algum usuario do server`
}

