const savebtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEL = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
let myleads = []

//Get the items from the local storage after refreshing the page

let LeadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(LeadsFromLocalStorage){
    myleads = LeadsFromLocalStorage
    render(myleads)
}

function render(leads){   
    let listItems = ""
    for(let i = 0; i < leads.length; i++){

        listItems +=`
        <li>
            <a href = "${leads[i]}" target = _blank>${leads[i]}</a>        
        </li>`
        console.log(listItems)
    }

    ulEL.innerHTML = listItems
}

savebtn.addEventListener("click" , () => {
    
    myleads.push(inputEl.value)
    renderLead()
    inputEl.value = ""

    localStorage.setItem("myLeads" , JSON.stringify(myleads))

    console.log(localStorage.getItem("myLeads"))
})


function renderLead(){
    let listItem = "<a href = 'www.google.com' target='_blank'><li>" + inputEl.value +"</li></a>"
    ulEL.innerHTML += listItem
}
   
deleteBtn.addEventListener("dblclick" , () => {
    console.log("Doubled clicked")
    localStorage.clear()
    myleads = []
    render(myleads)
})

tabBtn.addEventListener("click" , () =>{
    //Grab the url of the current tab

    chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myLeads" , JSON.stringify(myleads))
        render(myleads)
    })
    
})


