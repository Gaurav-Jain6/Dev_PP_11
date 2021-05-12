let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595?ex_cid=ipl2021:google_cpc:search:dsa_feed:msn&gclid=EAIaIQobChMItp-zwrO58AIVTUFgCh2UbQChEAAYASAAEgIZIvD_BwE" ;

const request = require("request") ;
const cheerio = require("cheerio") ;
const getAllMatches = require("./allMatches") ;

request(matchLink , function(err , resp , data)
{
    processData(data) ;
})

function processData(html)
{
    let myDocument = cheerio.load(html + "") ;
    let aTag = myDocument(".widget-items.cta-link a") ;
    // console.log(aTag) ;
    // console.log( aTag.attr("href") ) ;
    let allMatchesLink = "https://www.espncricinfo.com" + aTag["0"].attribs.href ;
    // console.log(allMatchesLink) ; 
    getAllMatches(allMatchesLink) ;
}