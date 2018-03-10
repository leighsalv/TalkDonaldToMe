'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())



//=== ROUTES ==============================================
app.get('/', function(req, res) {
  res.send(".")
})

let token = "EAAH59xTPWIsBAMhZBTZAbg7GmWrmWTgeU5xANUSEgOrtVp4bNhHCjLeQi0877Sf0AoVm79HvMeGZAhbWoLvFyPejefZA94AZAIVKzFvhwEN18PThiZCnPSeR5ozBRBJkjWdeIOCwLLabtGPnj9WPHnovxP1Oyc0xooTEADQk7G3gZDZD"

//=== FACEBOOK =============================================
var sayings = ["Bing bing, bong bong, bing bing bing",
  "I don’t want the Presidency. I’m going to help a lot of people with my foundation–and for me, the grass isn’t always greener.",
  "I will be the greatest jobs president that God ever created. I tell you that.",
  "I don’t have a racist bone in my body.",
  "I think I’d get along very well with Vladimir Putin. I just think so. People say, ‘What do you mean?’ I think I would get along well with him.",
  "I have a great temperament. My temperament is very good, very calm.",
  "Everything I’ve done virtually has been a tremendous success.",
  "Marco Rubio, I’ve never seen anybody sweat like that.",
  "It’s really cold outside, they are calling it a major freeze, weeks ahead of normal. Man, we could use a big fat dose of global warming!",
  "I would bring back waterboarding. And I’d bring back a hell of a lot worse than waterboarding.",
  "Don’t believe those phony numbers when you hear 4.9 and 5 percent unemployment. The number’s probably 28, 29, as high as 35. In fact, I even heard recently 42 percent.",
  "I will give you everything. … I’m the only one.",
  "There is no drought.",
  "And by the way, just so you know, I am the least racist person, the least racist person that you’ve ever seen, the least.",
  "I feel like a supermodel except, like, times 10, OK? It’s true. I’m a supermodel.",
  ""
];

var hillaryClinton = ["Do you know that Hillary Clinton was a birther? She wanted those records and fought like hell. People forgot. Did you know John McCain was a birther?",
"Even a race to Obama, she was gonna beat Obama. I don't know who would be worse, I don’t know, how could it be worse? But she was going to beat—she was favored to win—and she got schlonged.",
"I think the only card she has is the woman’s card. She’s got nothing else going.",
"Most corrupt candidate ever!",
"Many people are saying that the Iranians killed the scientist who helped the U.S. because of Hillary Clinton’s hacked emails.",
"Hillary wants to abolish, essentially abolish, the Second Amendment. By the way, and if she gets to pick her judges, nothing you can do, folks. Although the Second Amendment people—maybe there is, I don’t know. But I’ll tell you what, that will be a horrible day.",
"He [Obama] is the founder of ISIS. He’s the founder of ISIS, OK? He’s the founder. He founded ISIS and I would say the co-founder would be crooked Hillary Clinton.",
"Hillary Clinton is a bigot who sees people of color only as votes, not as human beings worthy of a better future.",
"She could walk into this arena right now and shoot somebody with 20,000 people watching, right smack in the middle of the heart and she wouldn’t be prosecuted, OK?",
"She goes around with armed bodyguards like you have never seen before. I think that her bodyguards should drop all weapons. They should disarm. Right? Right? I think they should disarm immediately.",
"Do people notice Hillary is copying my airplane rallies—she puts the plane behind her like I have been doing from the beginning.",
"Hillary Clinton is taking the day off again, she needs the rest. Sleep well Hillary—see you at the debate!",
"Hillary is so corrupt, she got kicked off the Watergate Commission. How corrupt do you have to be to get kicked off the Watergate commission? Pretty corrupt."
];

var donaldSays = "";

app.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === "EAAH59xTPWIsBAMhZBTZAbg7GmWrmWTgeU5xANUSEgOrtVp4bNhHCjLeQi0877Sf0AoVm79HvMeGZAhbWoLvFyPejefZA94AZAIVKzFvhwEN18PThiZCnPSeR5ozBRBJkjWdeIOCwLLabtGPnj9WPHnovxP1Oyc0xooTEADQk7G3gZDZD") {
    res.send(req.query['hub.challenge'])
  }
  res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {

  let messaging_events = req.body.entry[0].messaging
  for (let i = 0; i < messaging_events.length; i++) {
    let event = messaging_events[i]
    let sender = event.sender.id

    }
    if (event.message && event.message.text) {
      let text = event.message.text
      text = text.toUpperCase();

      if(text.includes("HILLARY") || text.includes("CLINTON")) {
        donaldSays = hillaryClinton[Math.floor(Math.random() * hillaryClinton.length)];
        sendText(sender, donaldSays);
      }
      else{
      //sendText(sender, "Text echo: " + text.substring(0, 100))
      donaldSays = sayings[Math.floor(Math.random() * sayings.length)];
      sendText(sender, donaldSays);
    }
  }
  res.sendStatus(200)
})

function sendText(sender, text) {
  let messageData = {
    text: text
  }
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {
      access_token: token
    },
    method: "POST",
    json: {
      recipient: {
        id: sender
      },
      message: messageData,
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
