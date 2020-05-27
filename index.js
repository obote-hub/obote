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
//Database
const ops = new Map();
const queue = new Map();
client.afk = new Map();
client.work = new Map();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const afk = client.afk;
//Prefix
let prefix;
//Other Things
const directoryPath = path.join(__dirname, 'commands');
//Firebase
admin.initializeApp({
  credential: admin.credential.cert({
  "type": "service_account",
  "project_id": "obote-dd403",
  "private_key_id": "96f88b6e39df8d9dd89beb58cb659dde8ad8819f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCwlZWSENlNGlGm\nPrNX98amUNdXPVk/HYka4YCXOGCkVjhxXTuAL460F7+WOgHd1NQAlB/EKSIePBRW\nZiNdm2HxAO9SL9wl6lH9Bzc4f5gSBPKfQ4+eW3lXpFwNiuYt0ixnyhjYUt+Abh8i\n0zq239Ux5iKX/2YUwYbxf4RMIj2VAImcus1C4G8T1wwR5HQrVwurUnQa1RgK6fK3\nP2Ejx6UsWRAb1w2m5WTjuczwq/PlSOcdmh7/tPl47pXcSatRunI5OzBYB4qT9vch\nfJPKAZGN3RTltzou1Paf1OwunauWA+/g+TMoLYjYn0R73uIQoHHy4KELudVN6rvm\nV2KrjuexAgMBAAECggEAA01862s0wUArhEY6cPwBo2UyLd/IHknVYWMT1mA30IML\nUbV6ciqRivVBwFPL6qP7JhqfIHpbeMDLaZVF9o98LLeFgl5CShRAndCne/9I7xdY\nGVn4YvAXjCfXD+rH5NYAPh21yr/8DakhnHNibv6vPFxvS7P7awp2lWg653ihebqt\noIS8erFcwekgaMhx0Zms/tZ7Ebxmrvn1x6UYoIDHc8W3a4nf25d+sAgyEVl+b1ZO\n7du6LeBFIpUrkOhUJ0oI7RBT1l7kIjPUo6MgPYHM59G0CwD2InLlcgLsL7aNyxMW\neS+30vYmbOBzRRB5rBvlIXUtqY8efQggKMdwJblGcQKBgQDhvhE2tHnJk7rPt0Mq\nnJ06xP8cvy0ugZQQJwRRt8BBE1Hncz5qvGD3bRda1nPkAPt/nobfwBmfjGsYQeET\nMJACGdVvvd4TF2gA2jrlTaCLnFWEua1dKFITfGkdQXhEymN4A+vaoPeRis7mZLR6\nOdUV46YLmuwHYF69hpREdrTPWQKBgQDIQL80aSdtUIQtVei+3t+z3dHfYTJYdloq\nSDPnCmkJ3PKmsxTswJGhnlc8/hA3ZmscK6iRdlYqs7HFvsVPyj5+uL8BQKxqd0rb\ncpcTSAA9G4nI77tOZgCV/KeNAVrDB2Idr8u2Q9yMhd1JJmmww04M/NZqDef0Awjm\nOCoY5i7oGQKBgQDdFB6Zm8BWKQbgXJM8DStynfFWfuhJzn9qHjv9p95yHPCuok+z\nio/QYZdoz/OpjUjBIEjooqK1fXh4xjQebgXq+M/t4l22BstFYnQhk5eygsXB+XIO\ndOmEyefLzg1yGV+27ugyMkii0fV075VMyoykJlG8tdmIE9pU9JMKRdMn6QKBgQC8\nKkLAL7Kxf//DTb82YtwW+e70FDOndgZBRrkmdty+PNPxGcMmt8ff8pYMpLp+JAmv\nXcK2dFiBJXp80kY7NFHG5zfrKGcaX1+Clskof/ZhdRfiLIl3IFeal96km0o6ihyC\nwqYLbPa3QC3vR132j34urAGZg9mZqqRZFxtPbDNVOQKBgQCBU1R40PGaqGKNy0hI\nbIPtMYgRPawWBZ8+4qqUlW6eUtmwOmsFBIKZuUakW6N9vN4ZDero7Ac3prwlCULO\nAZ+JNUQNslx1OWDN1F6DFtpo7ADiBe0CredbfEeeRPQqIAwmo0BhuLcBmec5zmeY\ndlZbyYVqBVfsO7nvZiU20p1mEA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-44syz@obote-dd403.iam.gserviceaccount.com",
  "client_id": "117629468852723428086",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-44syz%40obote-dd403.iam.gserviceaccount.com"
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
  `online em ${client.guilds.cache.size} severs`,
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

if(commandfile)  commandfile.run(client,message,args,ops,afk,db,prefix)//Runs the file if it exist;

})


  

  
                    


  
});

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
