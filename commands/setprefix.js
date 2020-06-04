const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops, afk, db, prefix) => {
  if(!args[0])return message.channel.send(`Novo prefixo nao informado.`)


  let newprefix = args[0];
  
  db.collection('Guild').doc(message.guild.id).update({
    'prefix': `${newprefix}`
  }).then(() => {
    message.channel.send(`Prefixo alterado de ${prefix} para ${newprefix}`)
  })
} 

module.exports.config = {
	name:  "setprefix",
	aliases: ["prefix", 'sprefix', 'prefixo', 'setarprefixo', 'prefixset'],
	description: `Muda meu prefixo nesse server `
}
