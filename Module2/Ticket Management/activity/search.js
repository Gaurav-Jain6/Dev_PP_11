let searchBox = document.querySelector(".search-box") ;
let ticketsContainerForSearch = document.querySelectorAll(".tickets-container .ticket") ;

let idToBeSearched ;

console.log(ticketsContainerForSearch.length) ;
// console.log(searchBox) ;
searchBox.addEventListener("keypress" , searchclick) ;

function searchclick(e)
{
    console.log(e) ;
    if(e.key == "Enter" && e.target.value)
    {
        idToBeSearched = e.target.value ;
        console.log(e.target.value) ;
        e.target.value = "" ;
        removeExtraTickets() ;

    }
}
// console.log(idToBeSearched) ;

function removeExtraTickets()
{
    for(let i = 0 ; i < ticketsContainerForSearch.length ; i++)
    {
        let id = ticketsContainerForSearch[i].querySelector(".ticket-id").textContent;
        // console.log(id) ;

        if(idToBeSearched != id)
        {
            ticketsContainerForSearch[i].remove() ;
        }
    }
}