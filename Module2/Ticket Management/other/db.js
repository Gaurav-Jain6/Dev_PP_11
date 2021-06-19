let myDB = window.localStorage ;
let ticketsContainer = document.querySelector(".tickets-container");
let allFilterClasses = ["red" , "blue" , "green" , "yellow" , "black"] ;
let lockbtnisPressed = true ;
function loadTickets()
{
    let allTickets = myDB.getItem("allTickets") ;
    if(allTickets)
    {
        allTickets = JSON.parse(allTickets) ;
        for(let i = 0 ; i < allTickets.length ; i++)
        {
            let ticketInfoObject = allTickets[i] ;
            appendTicket(ticketInfoObject); 
        }
    }
}

loadTickets() ;


function loadSelectedTickets(filter)
{
    let allTickets = myDB.getItem("allTickets") ;
    if(allTickets)
    {
        allTickets = JSON.parse(allTickets) ;
        for(let i = 0 ; i < allTickets.length ; i++)
        {
            let ticketInfoObject = allTickets[i] ;
            if(ticketInfoObject.ticketFilter == filter)
            {
                appendTicket(ticketInfoObject) ;
            }
        }
    }
}

function saveTicketToDB(ticketInfoObject)
{
    // let allTickets = [ticketInfoObject] ;
    let allTickets = myDB.getItem("allTickets") ;
    if(allTickets)
    {
        // already all tickets are present 
        allTickets = JSON.parse(allTickets) ;
        allTickets.push(ticketInfoObject) ;
        myDB.setItem("allTickets" , JSON.stringify(allTickets)) ;
    }
    else{
        // no all Tickets key found
        let allTickets = [ticketInfoObject] ;
        myDB.setItem("allTickets" , JSON.stringify(allTickets)) ;

    }
}


function appendTicket(ticketInfoObject)
{
    let {ticketFilter , ticketValue , ticketId} = ticketInfoObject ;
    let ticketDiv = document.createElement("div") ;
    ticketDiv.classList.add("ticket") ;
    ticketDiv.innerHTML = `<div class="ticket-header ${ticketFilter}"></div>
        <div class="ticket-content">
            <div class="ticket-info">
                <div class="ticket-id">${ticketId}</div>
                
                <div class="ticket-lock fas fa-unlock"></div>
                <div class="ticket-delete fas fa-trash">
                </div>
            </div>
            <div class="ticket-value">
                ${ticketValue} 
            </div>
        </div>` ;

    
    let ticketHeader = ticketDiv.querySelector(".ticket-header") ;
    // console.log(ticketHeader) ;

    ticketHeader.addEventListener("click" , function(e){
        // console.log(e) ;
        let currentFilter = e.target.classList[1] ;
        let indexOfCurrentFilter = allFilterClasses.indexOf(currentFilter) ;
        let newIndex = (indexOfCurrentFilter + 1) % allFilterClasses.length ;
        let newFilter = allFilterClasses[newIndex] ;

        ticketHeader.classList.remove(currentFilter);
        ticketHeader.classList.add(newFilter) ;

        let allTickets = JSON.parse(myDB.getItem("allTickets")) ;
        for(let i = 0 ; i < allTickets.length ; i++)
        {
            if(allTickets[i].ticketId == ticketId){
                allTickets[i].ticketFilter = newFilter ;
            }
        }
        myDB.setItem("allTickets" , JSON.stringify(allTickets)) ;
    })
    
    let deleteTicketBtn = ticketDiv.querySelector(".ticket-delete") ;
    let lockBtn = ticketDiv.querySelector(".ticket-lock") ;
    lockBtn.addEventListener("click" , function(e){

        for(let i = 0 ; i < e.target.classList.length ; i++)
        {
            if(i == 2)
            {
                if(e.target.classList[2] == "fa-unlock")
                {
                    let lockClass = e.target.classList[2] ;
                    let lockadd = "fa-lock" ;
                    e.target.classList.remove(lockClass);
                    e.target.classList.add(lockadd) ;
                    // console.log(e) ;
                    lockbtnisPressed = false ;
                }
                else if(e.target.classList[2] == "fa-lock"){
                    // console.log(e.target.classList) ;
                    let lockClass = e.target.classList[2] ;
                    let lockremove = "fa-unlock" ;
                    e.target.classList.remove(lockClass);
                    e.target.classList.add(lockremove) ;
                    // console.log(e) ;
                    lockbtnisPressed = true ;
                }
            }
        }
    })
    // console.log(deleteTicketBtn) ;
    deleteTicketBtn.addEventListener("click" , function(e){
    // console.log(e) ;
    console.log(ticketId) ;
    

    if(lockbtnisPressed)
    {
        ticketDiv.remove() ; // remove data form ui only
        deleteTicketFromDb(ticketId) ;
    }

    })

    ticketsContainer.append(ticketDiv) ;

}

function deleteTicketFromDb(ticketId)
{
    let allTickets = JSON.parse(myDB.getItem("allTickets")) ;
    // [{} , {} , {} , {} , {} ]
    let updateTickets = allTickets.filter(function(ticketsObject){
        if(ticketsObject.ticketId == ticketId)
        {
            return false ;
        }
        return true ;
    })
    myDB.setItem("allTickets" , JSON.stringify(updateTickets)) ;
}