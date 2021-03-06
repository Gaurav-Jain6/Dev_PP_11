let allFilters = document.querySelectorAll(".filter") ;
let openModal = document.querySelector(".open-modal") ;
let closeModal = document.querySelector(".close-modal") ;
let ticketModalOpen = false;
let isTextTyped = false ;

for(let i = 0 ; i < allFilters.length ; i++)
{
    allFilters[i].addEventListener("click" , selectFilter) ;
}

// function selectFilter(e)
// {
//     let filterSelected = e.target.classList[1] ;
//     console.log(filterSelected) ;
//     if(ticketsContainer.classList.length > 1)
//     {
//         ticketsContainer.classList.remove(ticketsContainer.classList[1]) ;
//     }
//     ticketsContainer.classList.add(filterSelected) ;
//     console.log(e) ;
// }

// let search = document.querySelector(".search-box") ;
// search.addEventListener("click" , searchBox) ;
// let searchText = false ;
// function searchBox(e)
// {
//     console.log(e) ;
//     if(!searchText)
//     {
//         searchText = true ;
//         e.target.textContent = "" ;
//     }
//     search.addEventListener("keypress" , seaB) ;
// }
// let idToBeSearched ;
// function seaB(e)
// {
//     console.log(e.target.textContent) ;
//     console.log(e.key) ;
//     if(e.key == "Enter")
//     {
//         idToBeSearched = e.target.textContent ;
//         console.log(e.target.textContent) ;
//     }

// }

// // function searchid(ticketId)
// // {
// //     if(idToBeSearched == ticketId)
// //     {
// //         appendTicket(ticketInfoObject) ;
// //     }
// // }

openModal.addEventListener("click" , openTicketModal) ;
closeModal.addEventListener("click" , closeTicketModal) ;


function selectFilter(e)
{
    if(e.target.classList.contains("active-filter"))
    {
        e.target.classList.remove("active-filter") ;

        ticketsContainer.innerHTML = "" ;
        loadTickets() ;
    }
    else
    {
        if(document.querySelector(".active-filter"))
        {
            document.querySelector(".active-filter").classList.remove("active-filter") ;
        }
        e.target.classList.add("active-filter") ;
        ticketsContainer.innerHTML = "";
        let filterClicked = e.target.classList[1] ;
        // console.log(filterClicked) ;
        loadSelectedTickets(filterClicked) ;
    }

    // console.log(e) ;
}


function openTicketModal(e)
{
    if(ticketModalOpen)
    {
        return ;
    }
    // console.log(e) ;

    let ticketModal = document.createElement("div") ;
    ticketModal.classList.add("ticket-modal") ;
    ticketModal.innerHTML=`<div class="ticket-text" contentEditable="true" spellcheck="false">Enter Your Text!!!</div>
        <div class="ticket-filters">
            <div class="ticket-filter red selected-filter"></div>
            <div class="ticket-filter blue"></div>
            <div class="ticket-filter green"></div>
            <div class="ticket-filter yellow"></div>
            <div class="ticket-filter black"></div>
        </div>` ;
    document.querySelector("body").append(ticketModal) ;
    ticketModalOpen = true ;
    isTextTyped = false ;

    let ticketTextDiv = ticketModal.querySelector(".ticket-text") ;
    ticketTextDiv.addEventListener("keypress" , handleKeyPress) ;

    let ticketFilters = ticketModal.querySelectorAll(".ticket-filter") ;
    for(let i = 0 ; i < ticketFilters.length ; i++)
    {
        ticketFilters[i].addEventListener("click" , function(e){
            if(e.target.classList.contains("selected-filter")){
                return ;
            }
            document.querySelector(".selected-filter").classList.remove("selected-filter") ;
            e.target.classList.add("selected-filter") ;
        })
    }

}

function closeTicketModal(e)
{
    if(ticketModalOpen)
    {
        document.querySelector(".ticket-modal").remove() ;
        ticketModalOpen = false ;
        isTextTyped =false ;
    }
    
}

function handleKeyPress(e)
{
    if(e.key == "Enter"  && isTextTyped && e.target.textContent)
    {

        let filterSelected = document.querySelector(".selected-filter").classList[1] ;
        // console.log(filterSelected) ;

        let ticketId = uuid() ;
        let ticketInfoObject = {
            ticketFilter: filterSelected , 
            ticketValue : e.target.textContent,
            ticketId: ticketId
        } ;
        appendTicket(ticketInfoObject) ;
        closeModal.click();
        saveTicketToDB(ticketInfoObject) ;
        // console.log(e);
        
    }
    if(!isTextTyped)
    {
        isTextTyped = true ;
        e.target.textContent = "" ;
    }
}

