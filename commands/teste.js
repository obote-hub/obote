const Discord = require('discord.js')
module.exports.run = async (client, message, args, ops, afk, db, prefix, mute, tts) => {
   db.collection('Channels').doc('Channels').set({
     "Channels": ["namaca", "ghiletofar"]	   
   })
   
   
   
 
	
}

module.exports.config = {
	name:  "teste",
	aliases: ["test", "testado"]
}
