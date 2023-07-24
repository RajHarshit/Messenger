import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://message-d79d3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const messagesInDB = ref(database, "messages")


const inputField = document.getElementById("input")
const sendButton = document.getElementById("send")
const messagesHr = document.getElementById("messages")

sendButton.addEventListener("click", function() {
    let inputValue = inputField.value
    
    push(messagesInDB, inputValue)
    
    clearInputField()
})


onValue(messagesInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingList()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            AppendItemToShoppingList(currentItem)
        }    
    } else {
        messagesHr.innerHTML = "No items here... yet"
    }
})


function clearShoppingList() {
    messagesHr.innerHTML = ""
}


function clearInputField() {
    inputField.value = ""
}


function AppendItemToShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("contextmenu", function() {
        let exactLocationOfItemInDB = ref(database, `messages/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    messagesHr.append(newEl)
}
