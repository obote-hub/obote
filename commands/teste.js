const Discord = require('discord.js')
module.exports.run = async (client, message, args, ops, afk, db, prefix, mute, tts) => {
   db.collection('Channels').doc('Channels').set({
     "Channels": ["namaca", "ghiletofar"]	   
   })
   db.collection('Guild').doc(message.guild.id).get().then((q) => {
	   
	   console.log(q.data().Channels)
   })
   
   
 
	
}

module.exports.config = {
	name:  "teste",
	aliases: ["test", "testado"]
}
