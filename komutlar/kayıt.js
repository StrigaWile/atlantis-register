const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
let p = ayarlar.prefix
let ek = ayarlar.erkek1
let kd = ayarlar.kadın1
exports.run = async (client, message, args) => {
  
const sunucu = message.member.guild
  

  
if(!message.member.roles.cache.has(ayarlar.KayıtYetkilisi) && (!message.member.roles.cache.has(ayarlar.üstYetkiliRolü) && (!message.member.hasPermission("ADMINISTRATOR")))) return message.channel.send(new MessageEmbed().setDescription(`**Gerekli yetikiye sahip değilsin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));  

if(!ayarlar.erkek1) return message.channel.send (new MessageEmbed().setDescription(`**(\`Erkek1\`) Rolü ayarlanmamış.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(!ayarlar.erkek2) return message.channel.send (new MessageEmbed().setDescription(`**(\`Erkek2\`) Rolü ayarlanmamış.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(!ayarlar.unregister) return message.channel.send (new MessageEmbed().setDescription(`**(\`Kayıtsız\`) Rolü ayarlanmamış.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000})); 
if(!ayarlar.tag) return message.channel.send (new MessageEmbed().setDescription(`**(\`TAG\`) sembölü ayarlanmamış.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));



const kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`**Bir kullanıcı etiketlemelisin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
    
if(kullanici.roles.cache.has(ayarlar.erkek1)) return message.channel.send(new MessageEmbed().setDescription(`**Daha önceden kayıt olan birini tekrar kayıt edemezsin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(kullanici.roles.cache.has(ayarlar.erkek2)) return message.channel.send(new MessageEmbed().setDescription(`**Daha önceden kayıt olan birini tekrar kayıt edemezsin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(!kullanici.roles.cache.has(ayarlar.unregister)) return message.channel.send(new MessageEmbed().setDescription(`**Kişide <@&${ayarlar.unregister}> rölü bulunmadığından dolayı kayıt işlemine devam edemiyoruz.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
 
  
  
let isim = args[1]
let yas = Number(args[2])
if(kullanici.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription(`**Kendini kayıt edemez.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`**Bu Kullanıcı senden üst/aynı pozisyonda.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!isim || !yas) return message.channel.send(new MessageEmbed().setDescription(`**Geçerli isim veya yaş belirtiniz.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));

kullanici.setNickname(`${ayarlar.tag} ${isim} | ${yas}`)


  
let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
datab.add('case', 1)
const darkly = await datab.fetch('case')
var tarih = new Date(Date.now())
var tarih2 = ms(timereplace)
var tarih3 = Date.now() + tarih2 +10800000
let ay = moment(Date.now()+10800000).format("MM")  
let gün = moment(Date.now()+10800000).format("DD")
let saat = moment(Date.now()+10800000).format("HH:mm:ss")
let yıl = moment(Date.now()+10800000).format("YYYY")
let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
   
 
let kayıtlar = datab.fetch(`yetkili.${message.author.id}.toplam`)
let kayıtno = datab.fetch(`kayıtNo.${sunucu.name}`)
  
if(kayıtno === null) kayıtno = "0"
if(kayıtno === undefined) kayıtno = "0"
  
    
let toplamisim = datab.fetch(`isimler.${kullanici.id}.toplam1`);
  
  
if(toplamisim === null) toplamisim = "0"
if(toplamisim === undefined) toplamisim = "0"
  
  
datab.push(`isimlergösterme.${kullanici.id}.toplama`, {İsim: isim , Yas: yas , Yetkili: message.author.id , Zaman: kayıtsaat, KayıtNO: `${kayıtno}`});
     
let isimler = datab.get(`isimlergösterme.${kullanici.id}.toplama`)
let isimleriyazdır = isimler.filter(vader => vader.userID === isim.id).map(vader => ` • (\`${vader.İsim} | ${vader.Yas}\`) **${vader.Cinsiyet ? vader.Cinsiyet : "Belirleniyor"}** `)


const embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`${kullanici} üyesinin ismi başarıyla "${ayarlar.tag} ${isim} | ${yas}" olarak güncellendi"
Cinsiyet belirlemek için sadece: \`${p}erkek /${p}kadın\` yazman yeterli.

Kullanıcının veri tabanında kayıtlarını ${p}isimler @etiket/VaderID yazarak kontrol edebilirsin.`)
.setColor("#00d5ff")
message.channel.send(embed).then(async mesaj => {
let kayıtonay = await message.channel.awaitMessages((m) => m.author.id == message.author.id && ["erkek", "kadın", "iptal"].some(cevap => m.content.toLowerCase().includes(cevap)), {max: 1, time: 60000 });

if(kayıtonay.size === null) return message.channel.send(
      
 new MessageEmbed()
.setColor("#6666")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`**${kullanici} üyesinin kayıt işlemi herhangi bir işlem gerçekleşmediğinden iptal oldu**`))
.then(x => x.delete({timeout: 5000}));
  



let erkekonay = kayıtonay.first();
if (erkekonay.content.toLocaleLowerCase().includes(`${p}erkek`)) {

kullanici.roles.add(ayarlar.erkek1)
kullanici.roles.add(ayarlar.erkek2)
kullanici.roles.remove(ayarlar.unregister)
  

const onayembed = new MessageEmbed()
.setColor("#51adcf")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`${kullanici} üyesine <@&${ayarlar.erkek1}> rolü verildi`)
.setFooter(`Toplam kayıtların: (${kayıtlar})`)
message.channel.send(onayembed)

datab.add(`isimler.${kullanici.id}.toplam1`, 1 );
datab.add(`yetkili.${message.author.id}.erkek`, 1); 
datab.add(`yetkili.${message.author.id}.toplam`, 1)  
datab.add(`kayıtNo.${sunucu.name}`, 1)
datab.delete(`isimlergösterme.${kullanici.id}.toplama` ,1)
    
await datab.push(`isimlergösterme.${kullanici.id}.toplama`, {İsim: isim , Yas: yas , Yetkili: message.author.id , Cinsiyet: "ERKEK", Zaman: kayıtsaat,  KayıtNO: `${kayıtno},`});

client.channels.cache.get(ayarlar.genelChat).send(new MessageEmbed().setAuthor('Aramıza Katıldı !').setDescription(`**${kullanici} Adlı Kullanıcı Aramıza katıldı ! hoşgeldin umarım keyifli vakit geçirirsin.**`).setColor('BLUE'))

client.channels.cache.get(ayarlar.kayitLog).send(new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setColor("#00fff8")
.setDescription(`• **Yetkili:** (<@${message.author.id}>)
• **Kayıt Edilen:** (<@${kullanici.user.id}>)
• **Yeni ismi:** (\`${isim} | ${yas}\`)
• **Kayıt saat:** (\`${kayıtsaat}\`)`))
   
}

let kadınonay = kayıtonay.first();
if (kadınonay.content.toLocaleLowerCase().includes(`${p}kadın`)) {

kullanici.roles.add(ayarlar.kadın1)
kullanici.roles.add(ayarlar.kadın2)
kullanici.roles.remove(ayarlar.unregister)


const onayembed = new MessageEmbed()
.setColor("#51adcf")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`${kullanici} üyesine <@&${ayarlar.kadın1}> rolü verildi.`)
.setFooter(`Toplam kayıtların: (${kayıtlar})`)
message.channel.send(onayembed)
    
datab.add(`isimler.${kullanici.id}.toplam1`, 1 );
datab.add(`yetkili.${message.author.id}.kadın`, 1); 
datab.add(`yetkili.${message.author.id}.toplam`, 1)  
datab.add(`kayıtNo.${sunucu.name}`, 1)
datab.delete(`isimlergösterme.${kullanici.id}.toplama` ,1)
    
await datab.push(`isimlergösterme.${kullanici.id}.toplama`, {İsim: isim ,Yas: yas ,Yetkili: message.author.id ,Cinsiyet: "KADIN",Zaman: kayıtsaat, KayıtNO: `${kayıtno}`});
  
client.channels.cache.get(ayarlar.genelChat).send(new MessageEmbed().setAuthor('Aramıza Katıldı !').setDescription(`**${kullanici} Adlı Kullanıcı Aramıza katıldı ! hoşgeldin umarım keyifli vakit geçirirsin.**`).setColor('BLUE'))

client.channels.cache.get(ayarlar.kayitLog).send(new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setColor("#00fff8")
.setDescription(`• **Yetkili:** (<@${message.author.id}>)
• **Kayıt Edilen:** (<@${kullanici.user.id}>)
• **Yeni ismi:** (\`${isim} | ${yas}\`)
• **Kayıt saat:** (\`${kayıtsaat}\`)
`))
 
}

let iptal = kayıtonay.first();
if (iptal.content.toLocaleLowerCase().includes(`${p}iptal`)) {
const iptalembed = new MessageEmbed()
.setColor("#6666")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`${kullanici} üyesinin kayıt işlemi iptal edildi. ❌`)
message.channel.send(iptalembed).then(x => x.delete({timeout: 5000}));
      
datab.delete(`isimlergösterme.${kullanici.id}.toplama` ,1)}})


  }

  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nick", "isim"],
  permLevel: 0
};
exports.help = {
  name: "isim",
  description: "",
  usage: ""
};
   