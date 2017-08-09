const express = require("express")
const app = express()
const port = Number(process.env.PORT||8080)
const requestIp = require('request-ip');

app.set('trust_proxy', 1)

app.get("*", (req, res) => {

  const ip = requestIp.getClientIp(req)
  const languageUnedited = req.headers["accept-language"]
  const language = languageUnedited.substring(0, languageUnedited.indexOf(","))
  const softwareUnedited = req.headers["user-agent"]
  const software = softwareUnedited.substring(softwareUnedited.indexOf("(")+1, softwareUnedited.indexOf(")"))

  const final = {
    IpAddress: ip,
    Language: language,
    Software: software
  }

  res.send(final)
})

app.listen(port)