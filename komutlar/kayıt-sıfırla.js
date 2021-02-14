const Discord = require("discord.js");
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')


   module.exports.run = async (client, message, args) => {
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
 
    if(!message.member.roles.cache.has(ayarlar.ownerRolü) && (message.member.roles.cache.has(ayarlar.üstYetkiliRolü)) && (!message.author.hasPermission("ADMINISTRATOR")))  return message.channel.send(new Discord.MessageEmbed().setDescription(`Gerekli yetikiye sahip değilsin.`).setAuthor(message.author.tag,  message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
  
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  
    if(!member) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Bir kullanıcı etiketlemelisin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  
   //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
//-------------------------------------DATA BASE------------------------------------------\\
  
  let erkek1 = await datab.fetch(`yetkili.${member.id}.erkek`) 
  let kadin1 = await datab.fetch(`yetkili.${member.id}.kadin`) 
  let kayıtlar1 = await datab.fetch(`yetkili.${member.id}.toplam`);  
  

//-------------------------------------DATA BASE------------------------------------------\\
  
   
   //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
    if(erkek1 === null) return message.channel.send (new Discord.MessageEmbed().setDescription(`**<@${member.id}> Kişisine ait kayıt verisi bulunamadı.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    if(kadin1 === null) return message.channel.send (new Discord.MessageEmbed().setDescription(`**<@${member.id}> Kişisine ait kayıt verisi bulunamadı.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    if(kayıtlar1 === null) return message.channel.send (new Discord.MessageEmbed().setDescription(`**<@${member.id}> Kişisine ait kayıt verisi bulunamadı.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    if(erkek1 === undefined) return message.channel.send (new Discord.MessageEmbed().setDescription(`**<@${member.id}> Kişisine ait kayıt verisi bulunamadı.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    if(kadin1 === undefined) return message.channel.send (new Discord.MessageEmbed().setDescription(`**<@${member.id}> Kişisine ait kayıt verisi bulunamadı.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    if(kayıtlar1 === undefined) return message.channel.send (new Discord.MessageEmbed().setDescription(`**<@${member.id}> Kişisine ait kayıt verisi bulunamadı.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    
   //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
  
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
   if (member) {
   let e1 = datab.delete(`yetkili.${member.id}.toplam`)
   let k1 = datab.delete(`yetkili.${member.id}.kadin`)
   let t1 = datab.delete(`yetkili.${member.id}.erkek`)|| [];
   message.channel.send(new Discord.MessageEmbed().setDescription(`**Kayıt verilerini sıfırladım.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
  
 
}
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
}
  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isimsıfırla"],
  PermLevel: 0
};

 

exports.help = {
  name: "isıfırla",
  description: "",
  usage: ""
};