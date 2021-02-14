const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')

exports.run = async (client, message, args) => {
  

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  

if(!message.member.roles.cache.has(ayarlar.KayıtYetkilisi) && (!message.member.roles.cache.has(ayarlar.üstYetkiliRolü) && (!message.author.hasPermission("ADMINISTRATOR")))) return message.channel.send(new MessageEmbed().setDescription(`**Gerekli yetikiye sahip değilsin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));  
if(!ayarlar.unregister) return message.channel.send (new MessageEmbed().setDescription(`**(\`Kayıtsız\`) Rolü ayarlanmamış.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  

const kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`**Bir kullanıcı etiketlemelisin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription(`**Kendini kayıtsıza atamazsın.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(ayarlar.ownerRolü) return message.channel.send(new MessageEmbed().setDescription(`**Sunucu sahibini kayıtsıza atamazsın .**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`**Bu Kullanıcı senden üst/aynı pozisyonda.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));

  
  let sebep = args.splice(1).join(" ");
  if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`**Kişiyi neden kayıtsıza atıcaksın ?**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  

const embed = new MessageEmbed().setDescription(`**${kullanici} kişisi başarılı bir şekilde kayıtsıza atıldı.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()
message.channel.send(embed).then(x => x.delete({timeout: 10000}));

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
kullanici.setNickname(`${sebep}`)
kullanici.roles.add(ayarlar.booster);
kullanici.roles.add(ayarlar.unregister);
kullanici.roles.cache.forEach(r => {
kullanici.roles.remove(r.id)
});
  
    
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\  

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unregister'],
    permLevel: 0,
}

exports.help = {
      name: "kayıtsız"  // Kayıtsıza atıcağınız kişi de 6 dan fazla rol var ise işlem yaklaşık 5-10 saniye sürüyor 
  
}