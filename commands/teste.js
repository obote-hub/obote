const Discord = require('discord.js')
const fb = require('../database.js').db
module.exports.run = async (client, message, args, ops, afk, db, prefix, mute, tts) => {
	/*
   var channels = db.collection("Channels").doc("Channels");
   let admin = require('firebase-admin');
  
 let arrUnion = channels.update({
  Channels: admin.firestore.FieldValue.arrayUnion('inilsen')
});
	
	db.collection('Channels').doc('Channels').get().then((q) => {
		console.log(q.data().Channels)
	})
	*/
	
	
	await fb.connect()
        
	
	await fb.query(`CREATE TABLE evento(
          ID serial PRIMARY KEY,
          nome VARCHAR (50) UNIQUE NOT NULL
      )`)
	
	await fb.end()
}

module.exports.config = {
	name:  "teste",
	aliases: ["test", "testado"]
}
