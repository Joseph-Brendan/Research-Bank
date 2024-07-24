let addItemButton = document.getElementById("add-button")
let modalOverlay = document.getElementById("modal-overlay")
let nameOfItem = document.getElementById("name-of-item")
let linkToItem = document.getElementById("link-to-item")
let descriptionOfItem = document.getElementById("description-of-item")
let closeIcon = document.getElementById("close-icon")
let form = document.getElementById("form")
let itemsSection = document.getElementById("items-section")


// Hide and Reveal Modal Overlay
addItemButton.addEventListener("click", revealModalOverlay)
function revealModalOverlay(event){
    modalOverlay.classList.remove("modal-overlay")
    modalOverlay.classList.add("modal-overlay-visible")
    nameOfItem.focus()
}

closeIcon.addEventListener("click", closeModalOverlay)
function closeModalOverlay(event){
    if(modalOverlay.classList.contains("modal-overlay-visible")){
        modalOverlay.classList.remove("modal-overlay-visible")
        modalOverlay.classList.add("modal-overlay")
    }
}

let researchItems = []

// Collect and handle form data
form.addEventListener("submit", handleFormData)
function handleFormData(event){
    event.preventDefault()
    // Input Data Collection
    let itemName = nameOfItem.value
    let itemLink = linkToItem.value
    let itemDescription = descriptionOfItem.value 

    const aCreatedItem = {
        itemNAME : itemName,
        itemLINK : itemLink,
        itemDESCRIPTION : itemDescription
    }

    researchItems.push(aCreatedItem)
    localStorage.setItem("itemsOfResearch", JSON.stringify(researchItems))
    form.reset()
    closeModalOverlay()
    fetchItems()
}


//Fetch data from local storage
function fetchItems(){
    if(localStorage.getItem("itemsOfResearch")){
        researchItems = JSON.parse(localStorage.getItem("itemsOfResearch"))
    }
    printItemsOnUI()
}
fetchItems()


// Print Data From Lstorage to UI
function printItemsOnUI(){
    researchItems.forEach(function(item){
        let itemNameTOPRINT = item.itemNAME
        let itemLinkTOPRINT = item.itemLINK
        let itemDescrTOPRINT = item.itemDESCRIPTION

        let researchItemDiv = document.createElement("div")
        researchItemDiv.classList.add("research-item")

        let titleandDeleteContainerDiv = document.createElement("div")
        titleandDeleteContainerDiv.classList.add("title-and-delete-container")

        let itemTitle = document.createElement("a")
        itemTitle.setAttribute("href", `${itemLinkTOPRINT}`)
        itemTitle.setAttribute("target", "_blank")
        itemTitle.textContent = itemNameTOPRINT

        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash")
        deleteIcon.setAttribute("onclick", `deleteItem()`)

        let descriptionOfItemDiv = document.createElement("div")
        descriptionOfItemDiv.classList.add("description-of-item")

        let descriptionText = document.createElement("p")
        descriptionText.textContent = itemDescrTOPRINT

        // Append
        descriptionOfItemDiv.append(descriptionText)
        titleandDeleteContainerDiv.append(itemTitle, deleteIcon)
        researchItemDiv.append(titleandDeleteContainerDiv, descriptionOfItemDiv)
        itemsSection.append(researchItemDiv)
    })
}
