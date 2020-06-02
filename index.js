//Npm & packages
const firebase = require('firebase')
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin')
const fs = require('fs');
const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const path = require('path');
//Main Client
const client = new Discord.Client();
//Discord maps
const ops = new Map();
const tts = new Map();
const queue = new Map();
client.mute = new Map();
client.afk = new Map();
client.work = new Map();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const afk = client.afk;
const mute = client.mute;
//Prefix
let prefix;
//Other Things
const directoryPath = path.join(__dirname, 'commands');
let countChannel = {
  total: "716122989921435729",
  member: "716123124449411073",
  bots: "716123012000252025",
  serverID: "713563486155833424"
} 
//Firebase
admin.initializeApp({
  credential: admin.credential.cert({
  "type": "service_account",
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
})
})
const db = admin.firestore();


client.on('ready', () => {
  console.log(`Loguei como ${client.user.tag}!, em ${client.guilds.cache.size} servers;
     Comandos carregados: `);
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        
        console.log(file); 
    });
});
}); //Log on console when ready.

fs.readdir("./commands/", (err, files)  => { //Check commands folder the get the name and aliases for it.
  if(err) console.log(err)

  let jsfile = files.filter(f => f.split('.').pop() === 'js')
  if(jsfile.length <= 0){
    //If there's no file in commands folder, it returns with a error log
    return console.log(`[LOGS] Não  encontrei os comandos`);
  }
  jsfile.forEach((f, i)  =>{
    //Set names and aliases for each file in commands folder
    let pull = require(`./commands/${f}`)
    client.commands.set(pull.config.name, pull)
    pull.config.aliases.forEach(alias  => {
      client.aliases.set(alias, pull.config.name)
    })
  })
})


client.on('ready', () => {
  const activities_list = [
   "BRUHBRUH",
   "+help",
   "https://obote.glitch.me/",
  `online em ${client.guilds.cache.size} servers`,
  `com ${client.users.cache.size} users`
    ]; // creates an arraylist containing phrases you want your bot to switch through.
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    
    }, 10000); // Runs this every 10 seconds.
});




client.on('message', async message => { 
if (message.author.bot) return; //If user is a bot, return
if(message.channel.type === 'dm')return; //If command is used in dm and not in a guild, return

db.collection('Guild').doc(message.guild.id).get().then((q) => {
  if(!q.exists){
   db.collection('Guild').doc(message.guild.id).set({
    "guildName": message.guild.name,
    "guildMemberCount": message.guild.members.cache.filter(member => !member.user.bot).size,
    "guildBotCount": message.guild.members.cache.filter(member => member.user.bot).size,
    "guildOwner": message.guild.owner.user.username,
    "guildId": message.guild.id,
    "guildOwnerID": message.guild.owner.id,
    "prefix": '+',
    "totalMembers": message.guild.members.cache.filter(member => !member.user.bot).size + message.guild.members.cache.filter(member => member.user.bot).size
   });
   prefix = '+'
  } else {
    prefix = q.data().prefix
  }  
  }).then(() => {
const args = message.content.slice(prefix.length).trim().split(/ +/g); //Define arguments;
const command = args.shift().toLowerCase(); //Define the command
  
 if (message.mentions.has(client.user)) {
            return message.channel.send(`**Meu prefixo nesse server é - \`${prefix}\`**`)
        }
let afkcheck = client.afk.get(message.author.id);//Check afk data of user
if (afkcheck) return [client.afk.delete(message.author.id), message.channel.send(`<@${message.author.id}> **nao está mais afk.** `)];//If user is afk,  it deletes the data.

let mencao = message.mentions.members.first()//Check user mentioned
if(mencao){//If theres someone mentioned runs this code
    let mentioned = client.afk.get(mencao.id);//Get id of mentioned user
     if (mentioned){//If data of mentioned === true
       var embed = new Discord.MessageEmbed()
       .setDescription(`<@${message.author.id}>: **${mentioned.tag}** Está afk: ${mentioned.reason}`)
      message.channel.send(embed); //Send message explaning if user is afk and why
    }
}





if(!message.content.startsWith(prefix))return;//If message dont starts with prefix, return.


let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command))//Get command file for the command when is trigered

if(commandfile)  commandfile.run(client,message,args,ops,afk,db,prefix,mute,tts)//Runs the file if it exist;

})


  

  
                    


  
});
client.on('guildDelete', async data => {
  db.collection('Guild').doc(data.id).delete()
})

client.on('guildCreate', async data => {
  db.collection('Guild').doc(data.id).set({
    "guildName": data.name,
    "guildMemberCount": data.members.cache.filter(member => !member.user.bot).size,
    "guildBotCount": data.members.cache.filter(member => member.user.bot).size,
    "guildOwner": data.owner.user.username,
    "guildId": data.id,
    "guildOwnerID": data.owner.id,
    "prefix": '+',
    "totalMembers": data.members.cache.filter(member => !member.user.bot).size + data.members.cache.filter(member => member.user.bot).size   
   });
})


client.on("guildMemberAdd", async member => {
  let data = member.guild;
   db.collection('Guild').doc(data.id).get().then((q) => {
    if(!q.exists){
      db.collection('Guild').doc(data.id).set({
    "guildName": data.name,
    "guildMemberCount": data.members.cache.filter(amember => !amember.user.bot).size,
    "guildBotCount": data.members.cache.filter(amember => amember.user.bot).size,
    "guildOwner": data.owner.user.username,
    "guildId": data.id,
    "guildOwnerID": data.owner.id,
    "prefix": '+',
    "totalMembers": data.memberCount 
   });
    } else {
      db.collection('Guild').doc(data.id).update({
    "guildMemberCount": data.members.cache.filter(amember => !amember.user.bot).size,
    "guildBotCount": data.members.cache.filter(amember => amember.user.bot).size,
    "totalMembers": data.memberCount  
   });
    }
   })
});
client.on('guildMemberRemove', async member => {
 const guild = member.guild;
db.collection('Guild').doc(guild.id).get().then((q) => {
    if(!q.exists){
      db.collection('Guild').doc(guild.id).set({
    "guildName": guild.name,
    "guildMemberCount": guild.members.cache.filter(m => !m.user.bot).size,
    "guildBotCount": guild.members.cache.filter(m => m.user.bot).size,
    "guildOwner": guild.owner.user.username,
    "guildId": guild.id,
    "guildOwnerID": guild.owner.id,
    "prefix": '+',
    "totalMembers": guild.memberCount
   });
    } else {
      db.collection('Guild').doc(guild.id).update({
    "guildMemberCount": guild.members.cache.filter(amember => !amember.user.bot).size,
    "guildBotCount": guild.members.cache.filter(amember => amember.user.bot).size,
    "totalMembers": guild.memberCount
   });
    }
   })
})
   

client.login(process.env.BOT_TOKEN); // Logs in Discord API with bot's token
