const puppeteer = require("puppeteer");
const id = "kewova7788@geekale.com" ;
const pw = "123456789" ;

let tab ;
let idx ;
let gCode

let browserOpenPromise = puppeteer.launch({ 
    headless: false,
    defaultViewport : null,
    args: ["--start-maximized"],
});

browserOpenPromise.then(function(browser){
    console.log("browser is opened !");
    return browser.pages();
})
.then(function(pages){
    tab = pages[0] ;
    return tab.goto("https://www.hackerrank.com/auth/login") ;
})
.then(function(){
    return tab.type("#input-1" , id) ;
})
.then(function(){
    return tab.type("#input-2" , pw) ;
})
.then(function(){
    return tab.click(".ui-btn.ui-btn-large.ui-btn-primary") ;
})
.then(function(){
    return waitAndClick("#base-card-1-link") ;
})
.then(function(){
    return waitAndClick('a[data-attr2="interview-preparation-kit"]') ;
})
.then(function(){
    return tab.waitForSelector(".js-track-click.challenge-list-item", {visible: true});
})
.then(function(){
    return tab.$$(".js-track-click.challenge-list-item") ;
})
.then(function(allQuesArray){
    // [<a /> , <a /> , <a /> , <a />];
    // console.log(allQuesArray) ; // gives data in above form
    let allPendingPromises = [] ;
    for(let i = 0 ; i < allQuesArray.length ; i++)
    {
        let oneATag = allQuesArray[i] ;
        let pendingPromise = oneATag.evaluate(function(element) {return element.getAttribute("href")} , oneATag) ;
        allPendingPromises.push(pendingPromise) ;
    }
    // [ Promise<Pending> , Promise<Pending> , Promise<Pending> , Promise<Pending> ];
    // console.log(allPendingPromises) ;

    let allPromisesCombined = Promise.all(allPendingPromises) ; // Promise.all resolves all the promise itself and then returns the valuse 
    // console.log(allPromisesCombined) ; // this gives one pending promise only i.e. promise of allPendingPromise combined
    return allPromisesCombined ;
})
.then(function(allQuesLinks){
    // console.log(allQuesLinks) ;
    let oneQuesSolvePromise = solveQuestion(allQuesLinks[0]) ;
    for(let i = 1 ; i < allQuesLinks.length ; i++)
    {
        oneQuesSolvePromise = oneQuesSolvePromise.then(function(){
            let nextQuesSolvePromise = solveQuestion(allQuesLinks[i]) ;
            return nextQuesSolvePromise ;
        })
    }
    return oneQuesSolvePromise ;
})
.then(function(){
    console.log("All Ques Solved");
})
.catch(function(error){
    console.log(error) ;
}) ;




function getCode(){
    return new Promise(function(scb , fcb){
        let waitPromise = tab.waitForSelector(".hackdown-content h3" , {visible : true}) ;
        waitPromise.then(function(){
            return tab.$$(".hackdown-content h3") ;
        })
        .then(function(allCodesNamesElement){
            // [<h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3> ]
            // console.log(allCodesNamesElement) ;
            allCodesNamesPromise = [] ;

            for(let i = 0 ; i < allCodesNamesElement.length ; i++)
            {
                let codeNamePromise = tab.evaluate(function(elem){ return elem.textContent ; } , allCodesNamesElement[i]) ;
                allCodesNamesPromise.push(codeNamePromise) ;
            }
            // allCodeNamesPromise = [Promise<Pending> , Promise<Pending> , Promise<Pending> ];
            // console.log(allCodesNamesPromise);

            let combinedPromise = Promise.all(allCodesNamesPromise) ;
            // Promise<Pending> => Promise< [data,data,data] >
            // console.log(combinedPromise);
            return combinedPromise ;
        })
        .then(function(allCodeNames)
        {
            // [C++ , Python , Java];
            // console.log(allCodeNames);
            for(let i = 0  ; i < allCodeNames.length ; i++)
            {
                if(allCodeNames[i] == "C++")
                {
                    idx = i ;
                    break ;
                }
            }
            return tab.$$(".hackdown-content .highlight") ;
        })
        .then(function(allCodeDiv)
        {
            // [<div></div> , <div></div> , <div></div>];
            let codeDiv = allCodeDiv[idx] ;
            return tab.evaluate(function(elem){ return elem.textContent ;} , codeDiv) ;
        })
        .then(function(code)
        {
            gCode = code ;
            // console.log(gCode); // GOT c++ code
            scb() ;
        })
        .catch(function(error){
            fcb(error) ;
        })
    })
}


function pasteCode(){
    return new Promise(function(scb , fcb){
        let waitAndClickPromise = waitAndClick('input[type="checkbox"]') ;
        waitAndClickPromise.then(function(){
            return tab.waitForTimeout(2000) ;
        })
        .then(function()
        {
            return tab.type("#input-1" , gCode) ;
        })
        .then(function(){
            return tab.keyboard.down("Control");
        })
        .then(function(){
            return tab.keyboard.press("A") ;
        })
        .then(function(){
            return tab.keyboard.press("X") ;
        })
        .then(function(){
            return tab.click(".monaco-scrollable-element.editor-scrollable.vs") ;
        })
        .then(function(){
            return tab.keyboard.press("A") ;
        })
        .then(function(){
            return tab.keyboard.press("V") ;
        })
        .then(function(){
            return tab.keyboard.up("Control");
        })
        .then(function(){
            scb();
        })
    })
}



function handleLockBtn()
{
    return new Promise(function(scb , fcb){
        let waitForLockBtn = tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
        waitForLockBtn.then(function(){
            return tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled') ;
        })
        .then(function(lockButton){
            return tab.evaluate(function(elem){ return elem.click() } , lockButton) ;
        })
        .then(function(){
            // Lock Button Found
            console.log("Lock Button Found!!");
            scb() ;
        })
        .catch(function()
        {
            // Lock Button Not Found
            console.log("Lock Button Not Found !!");
            scb() ;
        })
    })
}


function solveQuestion(quesLink)
{
    return new Promise(function(scb , fcb)
    {
        let gotoPromise = tab.goto("https://www.hackerrank.com" + quesLink) ;
        gotoPromise.then(function(){
            return waitAndClick('div[data-attr2="Editorial"]') ;
        })
        .then(function()
        {
            return handleLockBtn() ;
        })
        .then(function()
        {
            return getCode() ;
        })
        .then(function(){
            return tab.click("#tab-1-item-0") ;
        })
        .then(function(){
            return pasteCode() ;
        })
        .then(function(){
            return tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right") ;
        })
        .then(function(){
            scb() ;
        })
        .catch(function(error){
            fcb(error) ;
        })
    });
}


function waitAndClick(selector){
    return new Promise(function(scb , fcb){
        let waitPromise = tab.waitForSelector(selector , {visible:true}) ;
        waitPromise.then(function(){
            return tab.click(selector) ;
        })
        .then(function(){
            scb() ;
        })
        .catch(function(){
            fcb() ;
        }) ;
    }) ;
}

