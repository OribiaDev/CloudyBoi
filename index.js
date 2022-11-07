//Startup
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./Jsons/config.json")
const fs = require('fs');
const Prefix = "cb ";

//Login
bot.login(config.token);

//Ready Function
bot.on('ready', () => {
    console.log("Launched!")
    bot.user.setActivity(`Starting up... please wait`);
    bot.user.setStatus("online");
    console.log(" _______ __   __ _______ ___ ______   _______ __    _ _______ _______ _______ ")
    console.log("|       |  | |  |       |   |    _ | |       |  |  | |  _    |       |       |")
    console.log("|_     _|  |_|  |    ___|   |   | || |   _   |   |_| | |_|   |   _   |_     _|")
    console.log("  |   | |       |   |___|   |   |_||_|  | |  |       |       |  | |  | |   |  ")
    console.log("  |   | |       |    ___|   |    __  |  |_|  |  _    |  _   ||  |_|  | |   |  ")
    console.log("  |   | |   _   |   |___|   |   |  | |       | | |   | |_|   |       | |   |  ")
    console.log("  |___| |__| |__|_______|___|___|  |_|_______|_|  |__|_______|_______| |___|  ")
    console.log('launched');
    bot.user.setActivity(`cb help | Serving ${bot.guilds.cache.size} servers!`);
    bot.users.cache.get("517490108065251329").send(" :white_check_mark:  I have started! :white_check_mark: ").catch(() => {
        return;
    });
});

//Message Function
bot.on('message', async (message) => {
    if(message.guild === null) return; 
    if(message.author.bot) return;
    if(message.author == null){
        return;
    }

    //Args
    const args = message.content.toLowerCase().slice(Prefix.length).trim().split(/ +/g);

    //Json Parsing
    let allcoins = JSON.parse(fs.readFileSync("./Jsons/coins.json", "utf8"));
    let allbanks = JSON.parse(fs.readFileSync("./Jsons/bank.json", "utf8"));
    let allmaxbanks = JSON.parse(fs.readFileSync("./Jsons/bankmax.json", "utf8"));

    if(!allcoins[message.author.id]){
        allcoins[message.author.id] = {
            allcoins: 0
        }
    }

    if(!allbanks[message.author.id]){
        allbanks[message.author.id] = {
            allbanks: 0
        }
    }

    if(!allmaxbanks[message.author.id]){
        allmaxbanks[message.author.id] = {
            allmaxbanks: 150
        }
    }

    let coins = allcoins[message.author.id].allcoins
    let coinsinbank = allbanks[message.author.id].allbanks
    let maxcoinsinbank = allmaxbanks[message.author.id].allmaxbanks

    //Commands:
   
    //Help Commands:
    if(message.content=="cb help"){
        let helpmenu = new Discord.MessageEmbed()
        .setTitle("**CloudyBoi Command List**")
        .setColor("#00FFFF")
        .setDescription(":money_with_wings: **Currency** \n ``cb help currency`` \n\n :confetti_ball:  **Fun** \n ``cb help fun`` \n\n :chess_pawn:  **Games** \n ``cb help games`` \n\n :tools: **Moderation** \n ``cb help moderation``")
        message.channel.send(helpmenu)
    }
    if(message.content=="cb help currency"){
        let helpmenucurrency = new Discord.MessageEmbed()
        .setTitle("**Currency Commands**")
        .setColor("#00FFFF")
        .setDescription(":scroll: **cb profile**: Shows you your profile!")
        .setFooter("[something] = required | (something) = optional ")
        message.channel.send(helpmenucurrency)
    }
    if(message.content=="cb help fun"){
        let helpmenufun = new Discord.MessageEmbed()
        .setTitle("**Fun Commands**")
        .setColor("#00FFFF")
        .setDescription(":game_die: **cb dice**: Rolls a dice!")
        .setFooter("[something] = required | (something) = optional ")
        message.channel.send(helpmenufun)
    }
    if(message.content=="cb help games"){
        let helpmenugames = new Discord.MessageEmbed()
        .setTitle("**Game Commands**")
        .setColor("#00FFFF")
        .setDescription("")
        .setFooter("[something] = required | (something) = optional ")
        message.channel.send(helpmenugames)
    }
    if(message.content=="cb help moderation"){
        let helpmenumoderation = new Discord.MessageEmbed()
        .setTitle("**Moderation Commands**")
        .setColor("#00FFFF")
        .setDescription("")
        .setFooter("[something] = required | (something) = optional ")
        message.channel.send(helpmenumoderation)
    }

    //Fun commands:

    //Ping Command
    if(message.content.toLowerCase() == "cb ping"){
        const m = await message.channel.send("Ping?");
        m.edit(`:ping_pong: Pong! | Latency is ${m.createdTimestamp - message.createdTimestamp}ms | API latency is ${bot.ws.ping}ms`);
    }

    //Dice Command
    if(message.content=="cb dice"){
        var die1 = Math.floor(Math.random() * 6) + 1;
        message.channel.send(`:game_die: You rolled a **${die1}**!`);
    }

    //Currency Commands:

    //Profile Command
    if(message.content.startsWith("cb profile")){
        if(message.mentions.users.first()){
            user = message.mentions.users.first()
            let useringuild = message.guild.member(user)
            if(!allcoins[useringuild.id]){
                allcoins[useringuild.id] = {
                    allcoins: 0
                }
            }
            if(!allbanks[useringuild.id]){
                allbanks[useringuild.id] = {
                    allbanks: 0
                }
            }     
            if(!allmaxbanks[useringuild.id]){
                allmaxbanks[useringuild.id] = {
                    allmaxbanks: 500
                }
            }
            let otherusercoins = allcoins[useringuild.id].allcoins
            let otherusercoinsinbank = allbanks[useringuild.id].allbanks
            let otherusermaxcoinsinbank = allmaxbanks[useringuild.id].allmaxbanks
            if(useringuild.user.avatarURL()==null){
                let otheruserprofilenull = new Discord.MessageEmbed()
                .setColor("#008080")
                .setThumbnail(useringuild.user.defaultAvatarURL)
                .setTitle(`${useringuild.displayName}'s profile!`)
                .setDescription(`:money_with_wings: Coins: ${otherusercoins} \n :moneybag: Bank: ${otherusercoinsinbank}/${otherusermaxcoinsinbank}`)
                message.channel.send(otheruserprofilenull)
            }else{
                let otheruserprofile = new Discord.MessageEmbed()
                .setColor("#008080")
                .setThumbnail(useringuild.user.avatarURL())
                .setTitle(`${useringuild.displayName}'s profile!`)
                .setDescription(`:money_with_wings: Coins: ${otherusercoins} \n :moneybag: Bank: ${otherusercoinsinbank}/${otherusermaxcoinsinbank}`)
                message.channel.send(otheruserprofile)
            }
        }else{
            if(message.author.displayAvatarURL()==null){
                let userprofilenull = new Discord.MessageEmbed()
                .setColor("#008080")
                .setThumbnail(message.author.defaultAvatarURL)
                .setTitle(`${message.author.username}'s profile!`)
                .setDescription(`:money_with_wings: Coins: ${coins} \n :moneybag: Bank: ${coinsinbank}/${maxcoinsinbank}`)
                message.channel.send(userprofilenull)
            }else{
                let userprofile = new Discord.MessageEmbed()
                .setColor("#008080")
                .setThumbnail(message.author.displayAvatarURL())
                .setTitle(`${message.author.username}'s profile!`)
                .setDescription(`:money_with_wings: Coins: ${coins} \n :moneybag: Bank: ${coinsinbank}/${maxcoinsinbank}`)
                message.channel.send(userprofile)
            }


        }
    }

    //Deposit Command
    if(message.content.startsWith("cb deposit") || message.content.startsWith("cb dep")){
        if(coinsinbank>=maxcoinsinbank) return message.channel.send("It looks like you already have a full bank!")
        if(!args[1]) message.reply("Please specify how many coins you want in the bank!")
        if(args[1]=="all"){
            if(coins<=maxcoinsinbank){
                coinsinbank = coinsinbank + coins
                message.channel.send(`Deposited **${coins}** coins into the bank!`)
                coins = coins - coins
                allcoins[message.author.id] = {
                    allcoins: coins
                };
                fs.writeFile("./Jsons/coins.json", JSON.stringify(allcoins), (err) => {
                    if (err) console.log(err)
                }); 
                allbanks[message.author.id] = {
                    allbanks: coinsinbank
                };
                fs.writeFile("./Jsons/bank.json", JSON.stringify(allbanks), (err) => {
                    if (err) console.log(err)
                }); 
            }
            if(coins>=maxcoinsinbank){
                let roominbank = maxcoinsinbank - coinsinbank
                coinsinbank = coinsinbank + roominbank;
                message.channel.send(`Deposited **${roominbank}** coins into the bank!`)
                coins = coins - roominback;
                allcoins[message.author.id] = {
                    allcoins: coins
                };
                fs.writeFile("./Jsons/coins.json", JSON.stringify(allcoins), (err) => {
                    if (err) console.log(err)
                }); 
                allbanks[message.author.id] = {
                    allbanks: coinsinbank
                };
                fs.writeFile("./Jsons/bank.json", JSON.stringify(allbanks), (err) => {
                    if (err) console.log(err)
                }); 
            }

        }else{
            let amtdep = args[1];
            AmtIsNan = isNaN(amtdep);
            if(AmtIsNan==true) return message.channel.send("Your arugment should be either a number, or ``all``")
            if(coins<amtdep) return message.channel.send("You dont have that many coins!")
            if(amtdep>maxcoinsinbank) return message.reply(`Woah there bud, you can only put ${maxcoinsinbank} coins in the bank!`)
            coins = Number(coins) - Number(amtdep);
            coinsinbank = Number(coinsinbank) + Number(amtdep);
            allcoins[message.author.id] = {
                allcoins: coins
             };
            fs.writeFile("./Jsons/coins.json", JSON.stringify(allcoins), (err) => {
                if (err) console.log(err)
            }); 
            allbanks[message.author.id] = {
                allbanks: coinsinbank
            };
            fs.writeFile("./Jsons/bank.json", JSON.stringify(allbanks), (err) => {
                if (err) console.log(err)
            });         
            message.channel.send(`Depostied ${amtdep} coins into the bank!`);
            
        }
    }

    //Withdraw Command


    //Cheat Command
    if(message.content=="cb cheat"){
        coins = coins + Number(500);
        allcoins[message.author.id] = {
            allcoins: coins
        };
        fs.writeFile("./Jsons/coins.json", JSON.stringify(allcoins), (err) => {
            if (err) console.log(err)
        });
        message.reply("Cheated 500 coins")
    }

    //Moderation Commands:

    //Game Commands:
    

});
//Guild Join Function
bot.on("guildCreate", guild => {
    bot.guilds.cache.forEach(guild=>{
        servercount1=+ bot.guilds.cache.size;
})
bot.user.setActivity(`cb help | Serving ${servercount1} servers!`);
    return  bot.users.cache.get("517490108065251329").send("Someone added my bot, server named: " + guild.name + " and the owner is: " + guild.owner.displayName).catch(() => {
        return;
    })                  
});
//Guild Leave Function
bot.on("guildDelete", guild => {
    bot.guilds.cache.forEach(guild=>{
        servercount1=+ bot.guilds.cache.size;
})
bot.user.setActivity(`cb help | Serving ${servercount1} servers!`); 
    return bot.users.cache.get("517490108065251329").send("CloudyBoi has left: " + guild.name).catch(() => {
       return; 
   })
});
//Error Function
bot.on('error', e => {
    return bot.users.cache.get("517490108065251329").send(`ERROR \n\n ${e}`).catch(() =>{
        return;
    });
});