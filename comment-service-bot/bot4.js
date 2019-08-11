//Customizeable variables:
const botname = "3urobeat's Comment Bot 4";
var quotes = ['Have a nice day!','Have a wonderful day!','Have a great day!','Have a nice week!','Have a great week!','You are an amazing person','I hope you have a good day!','Have a nice day my friend','Signed by https://steamcommunity.com/id/3urobeat/'];
//End

const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');

const bot = new SteamUser();
const community = new SteamCommunity();

const logininfo = require('./logininfo.json');
const config = require('./config.json');
const d = function d() { return new Date(); }
var randomstring = arr => arr[Math.floor(Math.random() * arr.length)];

const bootstart = d()

const logOnOptions = {
  accountName: logininfo.bot4accountName,
  password: logininfo.bot4password,
};

bot.logOn(logOnOptions);

//Startup
bot.on('loggedOn', () => {
  console.log(' ')
  console.log('*---------------------*')
  console.log(botname + ' version ' + config.version + ' successfully logged in.');
  bot.setPersona(config.status, botname);
  bot.gamesPlayed([config.game,730]);
  const bootend = d() - bootstart
  console.log('Ready after ' + bootend + 'ms!')
  console.log('*---------------------*')
  console.log(' ')
});

bot.on("webSession", (sessionID, cookies) => { 
  community.setCookies(cookies);
  //Accept offline group & friend invites
  //Still don't 100% understand this bit of code but thanks: https://dev.doctormckay.com/topic/1694-accept-friend-request-sent-in-offline/  
  for (let i = 0; i < Object.keys(bot.myFriends).length; i++) {
      if (bot.myFriends[Object.keys(bot.myFriends)[i]] == 2) {
          bot.addFriend(Object.keys(bot.myFriends)[i]);
          console.log('Added offline added user: ' + Object.keys(bot.myFriends)[i])
          bot.chatMessage(Object.keys(bot.myFriends)[i], 'Hello there! Thanks for adding me!\nRequest a free comment with !comment\nType !help for more info!')
      }
  }
  for (let i = 0; i < Object.keys(bot.myGroups).length; i++) {
    if (bot.myGroups[Object.keys(bot.myGroups)[i]] == 2) {
        bot.respondToGroupInvite(Object.keys(bot.myGroups)[i], true)
        console.log('Joined offline invited group: ' + Object.keys(bot.myGroups)[i])
    }
}
});

//Message interactions
bot.on('friendMessage', function(steamID, message) {
  switch(message.toLowerCase()) {
    case '!help':
      bot.chatMessage(steamID, "Type !comment to get a free comment!\nType !ping for a pong!\nType !owner to check out my owner's profile!\n\nJoin my !group")
      break;
    case '!comment':
      community.postUserComment(steamID, randomstring(quotes), (error) => {
        if(error !== null) {
          console.log("postUserComment error: " + error);
          bot.chatMessage(steamID, 'postUserComment error: ' + error)
          return;
        }
        bot.chatMessage(steamID, 'Okay i commented on your profile! If you are a nice person then leave a +rep on my profile!')
    });
      break;
    case '!ping':
      bot.chatMessage(steamID, 'Pong!')
      break;
    case '!owner':
      bot.chatMessage(steamID, "Check my owner's profile: 'https://steamcommunity.com/id/3urobeat/'")
      break;
    case '!group':
      bot.chatMessage(steamID, "Join my group here: https://steamcommunity.com/groups/3urobeatGroup")
      break;
    default:
      bot.chatMessage(steamID, "I don't know that command. Type !help for more info.")        
  }
	console.log("Friend message from " + steamID.getSteam3RenderedID() + ": " + message);
});

//Friend requests
bot.on('friendRelationship', (steamid, relationship) => {
  if (relationship === 2) {
    bot.addFriend(steamid);
    console.log('Added user: ' + steamid)
    bot.chatMessage(steamid, 'Hello there! Thanks for adding me!\nRequest a free comment with !comment\nType !help for more info!');
  }
});

bot.on('groupRelationship', (steamid, relationship) => {
  if (relationship === 2) {
    bot.respondToGroupInvite(steamid, true)
    console.log('Got added to group: ' + steamid)
  }
});