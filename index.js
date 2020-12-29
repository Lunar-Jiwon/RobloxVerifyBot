const Discord = require('discord.js');
const {token,prefix,rbx_cookie} = require('./settings.json');
const client = new Discord.Client();
const fs = require('fs');
const RobloxModule = require('./Commands/module/RobloxModule')
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name,command);
}
client.once('ready',()=>{
    client.user.setActivity(';인증', { type: 'PLAYING' });
    console.log("Ready");
    RobloxModule.login(rbx_cookie)
});

client.on('message',(message)=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift();
    if(!client.commands.has(command)) return;
    try{
        client.commands.get(command).execute(message,args);
    }catch(error){
        console.log(error)
    }
})

client.login(token)
