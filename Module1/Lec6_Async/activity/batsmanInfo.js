const request = require("request") ;
const cheerio = require("cheerio") ;
const fs = require("fs") ;

let leaderBoard = [] ;
let countOfRequestSent = 0 ;

// let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard" ;

function getMatchDetails(matchLink)
{   
    console.log("Sending Request " , countOfRequestSent);
    request(matchLink , function(err , res , data)
    {
        countOfRequestSent-- ;
        allBatsmanInfo(data) ;
        console.log("callback " , countOfRequestSent);
        if(countOfRequestSent == 0){
            console.table(leaderBoard);
        }
    })
    countOfRequestSent++ ;
}

function allBatsmanInfo(html)
{  
    let myDocument = cheerio.load(html + "");

    let bothInnings = myDocument(".card.content-block.match-scorecard-table .Collapsible");
    for(let i = 0 ; i < bothInnings.length ; i++)
    {
        let oneInning = myDocument(bothInnings[i]);
        let teamName = oneInning.find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        // console.log(teamName);
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
                // processDetails(teamName , Name , runs , balls , fours , sixes , strikeRate) ;

                processLeaderBoard(teamName , Name , runs , balls , fours , sixes) ;
            }
        }
        // console.log("=========================================") ;
    }
}

function processLeaderBoard(teamName , Name , runs , balls , fours , sixes)
{
    runs = Number(runs) ;
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    for(let i = 0 ; i < leaderBoard.length ; i++)
    {
        let batsmanObject = leaderBoard[i] ;

        if(batsmanObject.Team == teamName && batsmanObject.Batsman == Name)
        {
            batsmanObject.Runs = batsmanObject.Runs + runs;
            batsmanObject.Balls += balls;
            batsmanObject.Fours += fours ;
            batsmanObject.Sixes += sixes ;
            return ; 
        }
    }

    let batsmanObject = {
        Team : teamName ,
        Batsman : Name ,
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes
    }

    leaderBoard.push(batsmanObject) ;
}



module.exports = getMatchDetails;
