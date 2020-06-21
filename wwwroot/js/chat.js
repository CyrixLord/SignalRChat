// I wrote this, this is the javascript chat

"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); // we put the endpoint and route information for this url /chathub in startup.cs creates the connection

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {  // look for the receivemessage message from the 
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li"); // creates a list item in the unsorted list we created in the index.cshtml client side
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li); // add to the unordered list control in index.cshtml the list item
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false; // activate the send button once a connection is established
    console.log("[SignalRChat] Connected.");
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

// The preceding code:
// Creates and starts a connection.
// Adds to the submit button a handler that sends messages to the hub.
// Adds to the connection object a handler that receives messages from the hub and adds them to the list.
