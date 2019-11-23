let newDiv = document.createElement('div');

newDiv.innerHTML = `<div id="chatWindow" class="touchSoftChat">
    <h2 id="heading">chat</h2>
    <input id="minimizeBtn" type="button" value="[]" onclick="minimizeButton()">
    <div id="chatMinimize" display="none" hidden = "false" >
        <textarea id="messageOutput" disabled="disabled" ></textarea>
        <textarea id="message" rows="3" cols="40"></textarea>
        <input id="btnSend" type="button" value="Send" onclick="sendButton()">
    </div>
</div>`;

document.body.append(newDiv);

function loadCss(href) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}
loadCss("https://rawcdn.githack.com/StasHlushakou/js--touchsoft-chat/0cc5b7e0a4f6f75d50b17c5b80d0b04392a1e107/task-01/model/model.css");
        
if (sessionStorage.getItem('isMinimize') == null){
    sessionStorage.setItem('isMinimize', true);
} else{
    if (sessionStorage.getItem('isMinimize') == "false"){
        minimizeButton();
    } 
}

if (sessionStorage.getItem('messages') == null){
    sessionStorage.setItem('messages', "");
} else{
    messageOutput.value = sessionStorage.getItem('messages');
}

function minimizeButton() {
    chatMinimize.hidden =  !chatMinimize.hidden;
    minimizeBtn.value = minimizeBtn.value == "-" ? "[]" : "-";
    sessionStorage.setItem('isMinimize', chatMinimize.hidden);
}

function sendButton() {
    let msg = message.value;
    if (msg != ""){
        message.value = "";
        sendToServer(msg);
        writeToMessageOutput("Вы", msg);
    }
}

function writeToMessageOutput(from, message) {
    let date = new Date();
    messageOutput.value += date.getHours() + ":" + date.getMinutes() + " " + from + " : " + message + "\r\n";
    sessionStorage.setItem('messages', messageOutput.value);
}

function sendToServer(str) {    
    let msg = {};
    msg.text = str;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:8080/chatJS`)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify(msg));
    xhr.onload = function() {
        let json = JSON.parse(xhr.response);
        writeToMessageOutput("Bot", json.text);
    };
    xhr.onerror = function() { 
        console.log(`Ошибка соединения`);
    };
}