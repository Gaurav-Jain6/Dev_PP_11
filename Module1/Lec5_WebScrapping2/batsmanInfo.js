const request = require("request") ;
const cheerio = require("cheerio") ;
const fs = require("fs") ;

// let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard" ;

function getMatchDetails(matchLink)
{
    request(matchLink , function(err , res , data)
    {
        allBatsmanInfo(data) ;
    })
}

function allBatsmanInfo(html)
{
    let myDocument = cheerio.load(html) ;

    let bothInnings = myDocument(".card.content-block.match-scorecard-table .Collapsible");
    for(let i = 0 ; i < bothInnings.length ; i++)
    {
        let oneInning = myDocument(bothInnings[i]);
        let teamName = oneInning.find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        console.log(teamName);
        let allTableRows = oneInning.find(".table.batsman tbody tr") ;

        for(let j = 0 ; j < allTableRows.length - 1 ; j++)
        {
            allTds = myDocument(allTableRows[j]).find("td") ;
            if(allTds.length > 1)
            {
                let Name = myDocument(allTds[0]).text() ;
                let runs = myDocument(allTds[2]).text() ;
                let balls = myDocument(allTds[3]).text() ;
                let fours = myDocument(allTds[5]).text() ;
                let sixes = myDocument(allTds[6]).text() ;
                let strikeRate = myDocument(allTds[7]).text() ;

                // console.log(Name + "=> " + runs + "  " + balls + "  " + fours + "  " + sixes + + "  " + strikeRate) ;
                // console.log(`Batsman = ${Name} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`) ;
                processDetails(teamName , Name , runs , balls , fours , sixes , strikeRate) ;
            }
        }
        console.log("=========================================") ;
    }
}

function checkTeamFolder(teamName) 
{
    // teamFolderPath = "./IPL/Delhi Capitals"
    let teamFolderPath = `./IPL/${teamName}` ;
    return fs.existsSync(teamFolderPath) ;
}

function checkBatsmanFile(teamName , Name , runs , balls , fours , sixes , strikeRate) 
{
    // "./IPL/Delhi Capitals/Rishabh pant.json"
    let batsmanFilePath = `./IPL/${teamName}/${Name}.json` ;
    return fs.existsSync(batsmanFilePath) ;
}

function updateBatsmanFile(teamName , Name , runs , balls , fours , sixes , strikeRate)
{
    let batsmanFilePath = `./IPL/${teamName}/${Name}.json` ;
    let batsmanFile = JSON.parse(fs.readFileSync(batsmanFilePath)) ;
    let innings = {
        Runs : runs ,
        Balls : balls , 
        Fours : fours, 
        Sixes : sixes,
        StrikeRate : strikeRate
    }
    batsmanFile.push(innings) ;
    fs.writeFileSync(batsmanFilePath , JSON.stringify(batsmanFile)) ;

}

function createBatsmanFile(teamName , Name , runs , balls , fours , sixes , strikeRate)
{
    let batsmanFilePath = `./IPL/${teamName}/${Name}.json` ;
    let batsmanFile = [] ;
    let innings = {
        Runs : runs ,
        Balls : balls , 
        Fours : fours, 
        Sixes : sixes,
        StrikeRate : strikeRate
    }

    batsmanFile.push(innings) ;
    fs.writeFileSync(batsmanFilePath , JSON.stringify(batsmanFile)) ;
}

function createTeamFolder(teamName)
{
    let teamFolderPath = `./IPL/${teamName}` ;
    fs.mkdirSync(teamFolderPath) ;
}

function processDetails(teamName , Name , runs , balls , fours , sixes , strikeRate)
{
    let isTeamFolder = checkTeamFolder(teamName) ;
    if(isTeamFolder)
    {
        let isBatsmanPresent = checkBatsmanFile(teamName , Name) ;
        if(isBatsmanPresent)
        {
            updateBatsmanFile(teamName , Name , runs , balls , fours , sixes , strikeRate) ;
        }
        else
        {
            createBatsmanFile(teamName , Name , runs , balls , fours , sixes , strikeRate) ;
        }
    }
    else{
        createTeamFolder(teamName) ;
        createBatsmanFile(teamName , Name , runs , balls , fours , sixes , strikeRate) ;
    }
}

module.exports = getMatchDetails;



