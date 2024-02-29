const { Client, GatewayIntentBits, Partials, ActivityType, Collection, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [ /* https://discord-api-types.dev/api/discord-api-types-v10/enum/GatewayIntentBits */
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
    ],
    partials: [ /* https://discord.js.org/#/docs/discord.js/14.0.3/typedef/Partials */
        Partials.Message,
        Partials.User,
        Partials.Channel,
        Partials.GuildMember
    ]
});
const wait = require('node:timers/promises').setTimeout;

const fs = require('fs');
var colors = require('colors');
require('dotenv').config(); // You need to reference dotenv in order to use .env
const express =require("express");
const app = express();
const prefix = process.env['PREFIX'];
const MONGO = process.env['MONGO'];
const mongoose = require('mongoose');
require('dotenv').config();
require('./Models/Levelling');
async function connectDB() {
   mongoose.set('strictQuery', false);
  await mongoose.connect(MONGO).then(() => console.log("Database Connected! Hopefully ig".brightCyan)).catch((e) => { console.log(`Database Connection Failed: ${e} `.red);                                                                                                                    }
)
}
connectDB();


app.listen(3000, (port) => {
  console.log(`project is running upon port ${port}!`.gray);
})

app.get("/", (req, res) => {
  res.send("hello world!");
})


client.on('ready', () => {
  console.log(client.user.username + " " + 'is online.')
  const ChannelID = "1095724314810122240";
  console.log("process restarted!");
  const daily = "The bot has restarted!"
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setThumbnail("https://images-ext-2.discordapp.net/external/DlgmJExw7qvIJGn8get75g5DfFNDDUEsGrHlSCjBPOk/%3Fsize%3D512/https/cdn.discordapp.com/avatars/943462117074419742/3b04d31b9cc06380a76a9c68921d22d3.webp?width=555&height=555")
    .addFields({
      name: " 📂 System status. 📂",
      value: "<a:boi:1082295999260803142> The bot is On! <a:boi:1082295999260803142>",
    })
    .setDescription(
        "```" +daily+ "```"
      )
    .setFooter({ text: "⚠️ Turn on / off system!" })
    .setTitle("Bot started!");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed
    ],
  });
    client.user.setActivity(`with Phoenixblade#1696`, {
        name: "PhoenixBot dashboard",
        type: ActivityType.Streaming,
        url: 'https://www.twitch.tv/phoenixblade124816',
    });
  
})


module.exports = client;



client.slashCommands = new Collection();
client.buttons = new Collection();

// Read the JSON file
const data = fs.readFileSync('./error.json');

// Parse the JSON data
const jsonData = JSON.parse(data);

// Modify the JSON data

// load the handlers
fs.readdirSync('./handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client)
})


client.on("error", (err) => {
  jsonData.date = Date.now();
jsonData.error = err.message;
  const ChannelID = "1080383103740162048";
  console.log("Discord API Error:", err);
  const Embed = new EmbedBuilder()
    .setColor("Green")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        `**Discord API Error/Catch:\n\n** \`\`\`` + err + `\`\`\`:\n\n ${err.code}`
      ),
    ],
  });
});

process.on("unhandledRejection", (reason, p) => {
  const ChannelID = "1080383205783392326";
  console.log("Unhandled promise rejection:", reason, p);
  const Embed = new EmbedBuilder()
    .setColor("Red")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```\n\n** ```" + p + "```"
      ),
    ],
  });
  jsonData.date = Date.now();
jsonData.error = reason;
});

process.on("uncaughtException", (err, origin) => {
  const ChannelID = "1080383254999343134";
  console.log("Uncaught Exception:", err, origin);
  const Embed = new EmbedBuilder()
    .setColor("Red")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Uncought Exception/Catch:\n\n** ```" + err + "```\n\n** ```" + origin + "```"
      ),
    ],
  });
  jsonData.date = Date.now();
jsonData.error = err.message;
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  const ChannelID = "1080383254999343134";
  console.log("Uncaught Exception Monitor:", err, origin);
  const Embed = new EmbedBuilder()
    .setColor("Yellow")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Uncaught Exception Monitor/Catch:\n\n** ```" + err + "```\n\n** ```" + origin + "```"
      ),
    ],
  });
  jsonData.date = Date.now();
jsonData.error = err.message;
});

process.on("warning", (warn) => {
  const ChannelID = "1080383041807073381";
  console.log("Warning:", warn);
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Warning/Catch:\n\n** ```" + warn + "```"
      ),
    ],
  });
  jsonData.date = Date.now();
jsonData.error = warn.message;
});

client.login(process.env.TOKEN).catch(console.error);// login the discord bot
client.on('debug', console.log);

// Convert the JSON data back to a string
const updatedData = JSON.stringify(jsonData);

// Write the updated JSON data back to the file
fs.writeFileSync('./error.json', updatedData);




