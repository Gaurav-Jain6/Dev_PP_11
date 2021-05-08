// let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-royal-challengers-bangalore-55th-match-1216505/full-scorecard";
let matchLink = "https://www.espncricinfo.com/series/ipl-2021-1249214/mumbai-indians-vs-chennai-super-kings-27th-match-1254084/full-scorecard"
const request = require("request") ;
const fs = require("fs") ;
const cheerio = require("cheerio") ;

request(matchLink , cb) ;

function cb(error , response , data)
{
    getHighestSixes(data) ;
}   

function getHighestSixes(data)
{
    let myDocument = cheerio.load(data) ;
    let bothBatsmanTable = myDocument(".table.batsman") ;

    // fs.writeFileSync("./batsman.html" , bothBatsmanTable) ;
    // console.log(bothBatsmanTable.text()) ;

    let highestSixesName ;
    let highestSixes ;
    let strikeRate ;

    for(let i = 0 ; i < bothBatsmanTable.length ; i++)
    {
        let battingTable = myDocument(bothBatsmanTable[i]) ;
        let allTableRows = battingTable.find("tbody tr") ;
        // console.log(allTableRows.length) ;

        for(let j = 0 ; j < allTableRows.length ; j++)
        {
            let allTds = myDocument(allTableRows[j]).find("td") ;
            // console.log(allTds.length) ;
            if(allTds.length > 1)
            {
                // console.log(allTds.length) ;
                if(i == 0 && j == 0)
                {
                    highestSixesName = myDocument(allTds[0]).find("a").text() ;
                    highestSixes = myDocument(allTds[6]).text() ;
                    strikeRate = myDocument(allTds[7]).text() ;
                }
                else
                {
                    let currentSixes = myDocument(allTds[6]).text() ;
                    let currentStrikeRate = myDocument(allTds[7]).text() ;
                    if(currentSixes > highestSixes || (currentSixes == highestSixes && currentStrikeRate > strikeRate))
                    {
                        highestSixesName = myDocument(allTds[0]).find("a").text() ;
                        highestSixes = currentSixes ;
                        strikeRate = currentStrikeRate ;
                    }
                }
            }
        }

    }
    console.log("Name = " + highestSixesName) ;
    console.log("No. of Sixes = " + highestSixes) ;
    console.log("Strike rate = " + strikeRate) ;
}


