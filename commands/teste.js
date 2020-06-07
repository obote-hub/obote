const Discord = require('discord.js')
module.exports.run = async (client, message, args, ops, afk, db, prefix, mute, tts) => {
   var channels = db.collection("Channels").doc("Channels");
   let admin = require('firebase-admin');
  
 let arrUnion = channels.update({
  Channels: admin.firestore.FieldValue.arrayUnion('inilsen')
});
	
}

module.exports.config = {
	name:  "teste",
	aliases: ["test", "testado"]
}
