const id = "pamico3332@nic58.com";
const pw = "12345678";
const puppeteer = require("puppeteer");

async function login(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
      });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.waitForTimeout(2000);
    let element = await tab.$('div[data-analytics="NavBarProfileDropDown"]');
    await element.click();
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let manageChallengeLi = bothLis[1];
    await manageChallengeLi.click();

    await addModerators(browser , tab)  ;
    
    // await tab.waitForSelector("a.backbone.block-center" , {visible:true}) ;
    // let allQuesLink = await tab.$$("a.backbone.block-center") ;
    // console.log(allQuesLink.length) ;


    
    // for(let i = 0 ; i < allQuesLink.length ; i++)
    // {
    //     let oneATag = allQuesLink[i] ;

    //     let href = await tab.evaluate(function(elem){return elem.getAttribute("href") ;} , oneATag) ;
    //     href = "https://www.hackerrank.com" + href ;

    //     await addModerator(browser ,href) ;

    //     await tab.click('a[data-attr1="Right"]') ;
    //     // console.log(href) ;
    // }

    // // next button active hai to click on next
    // // addModerators(browser , tab);


    // let allLis = await tab.$$('.pagination li') ;
    // let nextBtnLi = allLis[allLis.length - 2] ;
    // let isDisabled = await tab.evaluate(function(elem){return elem.classList.contains("disabled") ; }, nextBtnLi) ;
    // // if true??
    // if(isDisabled)
    // {
    //     return ;
    // }
    // // else false ??
    // await nextBtnLi.click() ;
    // await tab.waitForTimeout(3000) ;

};
login();

async function addModerators(browser , tab)
{
    await tab.waitForSelector("a.backbone.block-center" , {visible:true}) ;
    let allQuesLink = await tab.$$("a.backbone.block-center") ;
    console.log(allQuesLink.length) ;


    
    for(let i = 0 ; i < allQuesLink.length ; i++)
    {
        let oneATag = allQuesLink[i] ;

        let href = await tab.evaluate(function(elem){return elem.getAttribute("href") ;} , oneATag) ;
        href = "https://www.hackerrank.com" + href ;

        await addModeratorToSingleQues(browser ,tab) ;

        await tab.click('a[data-attr1="Right"]') ;
        console.log(href) ;
    }

    // next button active hai to click on next
    // addModerators(browser , tab);


    let allLis = await tab.$$('.pagination li') ;
    let nextBtnLi = allLis[allLis.length - 2] ;
    let isDisabled = await tab.evaluate(function(elem){return elem.classList.contains("disabled") ; }, nextBtnLi) ;
    // if true??
    if(isDisabled)
    {
        return ;
    }
    // else false ??
    await nextBtnLi.click() ;
    await tab.waitForTimeout(3000) ;
    await addModerators(browser , tab) ;
}

async function addModeratorToSingleQues(browser , href){

    let newTab = await browser.newPage() ;
    await newTab.goto(href) ;

    await newTab.waitForTimeout(2000) ;

    // await newTab.waitForSelector('li[data-tab="moderators"]' ,{visible:true}) ;
    await newTab.click('li[data-tab="moderators"]') ;

    await newTab.waitForSelector('[id="moderator"]') ;
    await newTab.type('[id="moderator"]' , "gaurav") ;
    await newTab.click(".btn.moderator-save") ;
    await newTab.click(".save-challenge.btn.btn-green") ;
    await newTab.waitForTimeout(2000) ;
    await newTab.close() ;

}