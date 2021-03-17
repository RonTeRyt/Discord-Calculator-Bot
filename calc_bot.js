const Discord = require('discord.js')
const client = new Discord.Client()
//RonTeR
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    client.user.setActivity("!help | Resell Calculator")

    client.guilds.forEach((guild) => {
    	console.log(guild.name)
    	guild.channels.forEach((channel) => {
    		console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
    	})
    })

})

client.on('message', (recievedMessage) => {
	if (recievedMessage.author == client.user) {
		return
	}

	if (recievedMessage.content.startsWith("!")) {
		processCommand(recievedMessage)
	}

})

function processCommand(recievedMessage) {
	let fullCommand = recievedMessage.content.substr(1)
	let splitCommand = fullCommand.split(" ")
	let primaryCommand = splitCommand[0]
	let arguments = splitCommand.slice(1)

	if (primaryCommand == "help") {
		helpCommand(arguments, recievedMessage)
	} else if (primaryCommand == "resell") {
		resellCommand(arguments, recievedMessage)
	} else if (primaryCommand == "custom") {
		customCommand(arguments, recievedMessage)
	}else {
		recievedMessage.channel.send("These are all the commands \n" + "!help \n!resell [Resell amount] [Paid amount]" + "\n"
												+"!custom [Resell amount] [Paid amount] [percentage]")
	}
}

//Resell Command
function resellCommand(arguments, recievedMessage) {
	if (arguments.length < 2 || arguments.length > 2) {
		recievedMessage.channel.send("Wrong Response, Try `!resell 100 60`")
		return
	} else if (arguments[0] <= arguments[1]) {
		recievedMessage.channel.send("You are making no profit")
	}

	let flight = 0.20
	let flightResell = 1
	let flightProfit = 1
	flight = flight * arguments[0]
	flightResell = arguments[0] - flight 
	flightProfit = flightResell - arguments[1]

	let stadium = 0.20
	let stadiumResell = 1
	let stadiumProfit = 1
	stadium = stadium * arguments[0]
	stadiumResell = arguments[0] - flight 
	stadiumProfit = stadiumResell - arguments[1]

	let goat = 0.095
	let goatResell = 1
	let goatProfit = 1
	goatResell = ((arguments[0] - (arguments[0] * goat + 5)) - arguments[0] * 0.029)
	goatProfit = goatResell - arguments[1]  

	let stockx = 0.095
	let stockxResell = 1
	let stockxProfit = 1
	stockxResell = ((arguments[0] - (arguments[0] * stockx)) - arguments[0] * 0.03)
	stockxProfit = stockxResell - arguments[1]

	let bump = 0.06
	let bumpResell = 1
	let bumpProfit = 1
	bumpResell = ((arguments[0] - (arguments[0] * bump + 0.30)) - arguments[0] * 0.029)
	bumpProfit = bumpResell - arguments[1]

	let grailed = 0.06
	let grailedResell = 1
	let grailedProfit = 1
	grailedResell = ((arguments[0] - (arguments[0] * grailed + 0.30)) - arguments[0] * 0.029)
	grailedProfit = grailedResell - arguments[1]  

	recievedMessage.channel.send("Flight Club Return: $" + flightResell.toString() 
										 + "  Profit: $" + flightProfit.toString() + "\n"

								 + "Stadium Goods Return: $" + stadiumResell.toString()
										 + "  Profit: $" + stadiumProfit.toString() + "\n"

								 + "Goat Return: $" + goatResell.toString()
								         + "  Profit: $" + goatProfit.toString() + "\n"

								 + "StockX Return: $" + stockxResell.toString()
								         + "  Profit: $" + stockxProfit.toString() + "\n"

								 + "Bump Return: $" + bumpResell.toString()
									     + "  Profit: $" + bumpProfit.toString() + "\n"

								 + "Grailed Return: $" + grailedResell.toString()
									     + "  Profit: $" + grailedProfit.toString())
}

//Custom command
function customCommand(arguments, recievedMessage) {
	if (arguments.length < 3 || arguments.length > 3) {
		recievedMessage.channel.send("Wrong Response, Try `!custom 100 60 10`")
		return
	}

	let custom = 1
	let customResell = 1
	let customProfit = 1
	custom = 0.01 * arguments[2]
	custom = custom * arguments[0]
	customResell = arguments[0] - custom 
	customProfit = customResell - arguments[1]

	recievedMessage.channel.send("Custom Return: $" + customResell.toString() 
										 + "  Profit: $" + customProfit.toString())
}

//Help command
function helpCommand(arguments, recievedMessage) {
	if (arguments.length == 0) {
		recievedMessage.channel.send("These are all the commands \n" + "!help \n!resell [Resell amount] [Paid amount]" + "\n"
												+"!custom [Resell amount] [Paid amount] [Percentage]")
	} else {
		recievedMessage.channel.send("You need help with " + arguments)
	}

}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

client.login(bot_secret_token)
