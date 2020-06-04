const Discord = require('discord.js')

module.exports.run = async (client, message, args, ops, afk) => {
  
   if(!message.mentions.members.first()){
	   return message.reply(`Você nao informou um usuario para beijar`)
   } 
   let sender =  message.author.id
   let pessoa = message.mentions.members.first();
  
	let kisses = ['https://media.tenor.com/images/26aaa1494b424854824019523c7ba631/tenor.gif', 'https://media.tenor.com/images/9fb52dbfd3b7695ae50dfd00f5d241f7/tenor.gif', 'https://media.tenor.com/images/dd777838018ab9e97c45ba34596bb8de/tenor.gif', 'https://media.tenor.com/images/1f9175e76488ebf226de305279151752/tenor.gif', 'https://media.tenor.com/images/68d59bb29d7d8f7895ce385869989852/tenor.gif', 'https://media.tenor.com/images/f2795e834ff4b9ed3c8ca6e1b21c3931/tenor.gif', 'https://media.tenor.com/images/197df534507bd229ba790e8e1b5f63dc/tenor.gif', 'https://media.tenor.com/images/29b22bb26ecc0943c95b9a1be81d3054/tenor.gif', 'https://media.tenor.com/images/0136ddedea728ae27df8fbcd19d680f5/tenor.gif', 'https://media.tenor.com/images/556f881d184f4dbfc4f99ae720273457/tenor.gif', 'https://media.tenor.com/images/48963a8342fecf77d8eabfd2ab2e75c1/tenor.gif', 'https://media.tenor.com/images/f2cef6ceb6f7d898142a423822fec28d/tenor.gif', 'https://media.tenor.com/images/25359520a0973f896b002689ed90db8d/tenor.gif', 'https://media.tenor.com/images/cebf4dc3536801abbbf4be8cc9d441f1/tenor.gif', 'https://media.tenor.com/images/71a3918947b8f13faae4a39b301fd5d8/tenor.gif', 'https://media.tenor.com/images/79dd33103e73e07454fa1d71ddedf580/tenor.gif', 'https://media.tenor.com/images/55d3a2536717546ae49c1e54af15f1b0/tenor.gif', 'https://media.tenor.com/images/281a9020466c2b5547cc10d6294deb35/tenor.gif', 'https://media.tenor.com/images/fd65261a2c840100bd3dadd83b27f65d/tenor.gif', 'https://media.tenor.com/images/429f340cd05f9de96d9b0fdc87b9bd94/tenor.gif', 'https://media.tenor.com/images/ed21df7715e0ecce725e7b3e1f41f54e/tenor.gif', 'https://media.tenor.com/images/5e237bbb810796d75cef21f3ae37d818/tenor.gif']
	let fact = Math.round(Math.random() * kisses.length)
	let avatar = message.author.displayAvatarURL({format: 'png'})
	const returnembed = new Discord.MessageEmbed()
	.setColor('BLACK')
	.setDescription(`**${message.mentions.members.first()} deu um beijo de volta em <@${message.author.id}>!** 😳`)
	.setImage(kisses[fact])
	.setTimestamp()
	.setAuthor(message.author.tag, avatar);

   let embed = new Discord.MessageEmbed()
   .setColor('BLACK')
   .setDescription(`**<@${message.author.id}> beijou ${message.mentions.members.first()} !** 😳`)
   .setImage(kisses[fact])
   .setTimestamp()
   .setFooter(`Reaja com 🔁 para retribuir`)
   .setAuthor(message.author.tag, avatar)
   message.channel.send(embed).then(async function (message) {
	await message.react('🔁')
	const filter = (reaction, user) => {
		 return ['🔁'].includes(reaction.emoji.name) && user.id !== message.author.id && user.id === pessoa.id && user.id !== sender;
	};
	const time = 60000
	const collector = message.createReactionCollector(filter, { time: time });

	collector.on('collect', (reaction, reactionCollector) => {
		message.channel.send(returnembed)
	});
});


} 

module.exports.config = {
	name:  "kiss",
	aliases: ['ks', 'beijar', 'beijo'],
	description: `Beija algum usuario, reaja com \`🔁\` para beijar de volta`
}
