'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



//=== ROUTES ==============================================
app.get('/', function(req, res) {
	res.send(".")
})

let token = "EAAH59xTPWIsBAMhZBTZAbg7GmWrmWTgeU5xANUSEgOrtVp4bNhHCjLeQi0877Sf0AoVm79HvMeGZAhbWoLvFyPejefZA94AZAIVKzFvhwEN18PThiZCnPSeR5ozBRBJkjWdeIOCwLLabtGPnj9WPHnovxP1Oyc0xooTEADQk7G3gZDZD"

//=== FACEBOOK =============================================

var

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "EAAH59xTPWIsBAMhZBTZAbg7GmWrmWTgeU5xANUSEgOrtVp4bNhHCjLeQi0877Sf0AoVm79HvMeGZAhbWoLvFyPejefZA94AZAIVKzFvhwEN18PThiZCnPSeR5ozBRBJkjWdeIOCwLLabtGPnj9WPHnovxP1Oyc0xooTEADQk7G3gZDZD") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {

  curl -X POST -H "Content-Type: application/json" -d '{
    "recipient":{
      "id":"<PSID>"
    },
    "message":{
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
             {
              "title":"Welcome!",
              "image_url":"https://petersfancybrownhats.com/company_image.png",
              "subtitle":"We have the right hat for everyone.",
              "default_action": {
                "type": "web_url",
                "url": "https://petersfancybrownhats.com/view?item=103",
                "messenger_extensions": false,
                "webview_height_ratio": "tall",
                "fallback_url": "https://petersfancybrownhats.com/"
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://petersfancybrownhats.com",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Start Chatting",
                  "payload":"DEVELOPER_DEFINED_PAYLOAD"
                }
              ]
            }
          ]
        }
      }
    }
  }' "https://graph.facebook.com/v2.6/me/messages?access_token="EAAH59xTPWIsBAMhZBTZAbg7GmWrmWTgeU5xANUSEgOrtVp4bNhHCjLeQi0877Sf0AoVm79HvMeGZAhbWoLvFyPejefZA94AZAIVKzFvhwEN18PThiZCnPSeR5ozBRBJkjWdeIOCwLLabtGPnj9WPHnovxP1Oyc0xooTEADQk7G3gZDZD>"

	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id

		if (event.message && event.message.text) {
			let text = event.message.text
			sendText(sender, "Text echo: " + text.substring(0, 100))
		}
	}
	res.sendStatus(200)
})

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}

// === PORT =======================================
app.listen(app.get('port'), function() {
	console.log("running: port")
})
