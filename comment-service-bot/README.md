<div align="center">
	<h1 align="center">~ Steam Comment Service Bot ~</h1>
	<strong>Request a comment on your profile by texting a bot!</strong><br />See how to set up the bot and customize it below.<br /><br />
</div>

The bot will be online in form of an own account and operate through direct messages.  
To see a list of all commands the user can send the bot a message: `!help`.  

The bots feature a customizeable array for a selection of quotes, a variable for the name of the specific bot, a variable for the owner's profile and group link for advertisement.  
You can either provide multiple quotes for a random one every time or only one for always the same quote.  
Continue reading for a detailed setup guide.  

## Requirements

- `node` (https://nodejs.org)

Only necessary if you want to download via command prompt:
- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed

## Downloading

Click here: [Download](https://github.com/HerrEurobeat/steam-bots/archive/master.zip)  
Extract the zip and open the `comment-service-bot` folder.

## Setting the bot up

Rename the `logininfo.json.example` to `logininfo.json`.  
Open the file with a text editor and fill out the user names and passwords of each bot account you wanna use.  

Open `bot1.js` with a text editor. At the top of the file will be multiple variables and an array, called `quotes`.  
Like stated in the comment, you can provide multiple quotes for a random one or just one to use the same one everytime.  
Enter a name for the specific bot in the `botname` variable, enter your profilelink in the `owner` variable and your group in the `yourgroup` variable.  

Repeat these steps for the other bots you want to use. (`bot2.js, bot3.js ...`)  

The bot is now setup.  

## Starting the bot

To start the bots, open a command prompt for each bot and type:  
`node bot1.js`  
`node bot2.js` etc...

The bot will start and you should see him online. You can add him as a friend and send him a message: `!help`   
