
let newDiv = document.createElement('div');
newDiv.innerHTML = `
<div id="chatWindow" class="touchSoftChat">
    <h2 id="heading"></h2>
    <input id="minimizeBtn" type="button" value="[]" onclick="minimizeButton()">
    <div id="chatMinimize" hidden = "true" >
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
loadCss("chat.css");
// установка заголовка чата
heading.textContent = TSChat.title;
// проверка привязки(right/left)
if (TSChat.position == "left"){
    chatWindow.style.left="5px";
}
// проверка разрешения сворачивания чата и установка чату 
// необходимого состояния после перезагрузки страницы
if (!TSChat.allowMinimize){
    chatMinimize.hidden = false;
    minimizeBtn.disabled = true; 
    minimizeBtn.value = "-"
}else{
    if (sessionStorage.getItem('isHidden') == null){
        sessionStorage.setItem('isHidden', true);
    } else{
        if (sessionStorage.getItem('isHidden') == "false"){
            minimizeButton();
        } 
    }
}
// установка перетаскивания, если разрешено
if(TSChat.allowDrag) {
    heading.onmousedown = function(event) {
        let shiftX = event.clientX - chatWindow.getBoundingClientRect().left;
        let shiftY = event.clientY - chatWindow.getBoundingClientRect().top;
        chatWindow.style.position = 'fixed';
        chatWindow.style.bottom = "auto";
        chatWindow.style.right = "auto";
        moveAt(event.pageX, event.pageY);
        function moveAt(pageX, pageY) {
            chatWindow.style.left = pageX - shiftX + 'px';
            chatWindow.style.top = pageY - shiftY + 'px';
        }
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
        document.addEventListener('mousemove', onMouseMove);
        chatWindow.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            chatWindow.onmouseup = null;
            sessionStorage.setItem('dragLeft', chatWindow.style.left); 
            sessionStorage.setItem('dragTop', chatWindow.style.top);

        };
    };
    heading.ondragstart = function() {
      return false;
    };
}












// просьба ввести имя, если оно не установлено
if (sessionStorage.getItem('userName') == null){
    if (TSChat.requireName){
        sessionStorage.setItem('userName', "");
        writeToMessageOutput("", "Please, enter your name.");
    } else {
        sessionStorage.setItem('userName', "Вы");
    }
}





/*
//выбор способа отправки сообщений на сервер
let sendToServer = null;
if (TSChat.connectType == "xhr"){
    sendToServer = useXHR;
} else{
    sendToServer = useFetch;
}
*/


// заполнение формы вывода после перезагрузки страницы
if (sessionStorage.getItem('messages') == null){
    sessionStorage.setItem('messages', "");
} else{
    messageOutput.value = sessionStorage.getItem('messages');
}

//установка нужного положения при обновлении страницы
if(TSChat.allowDrag){
    if (sessionStorage.getItem('dragLeft') == null){
        sessionStorage.setItem('dragLeft', 'no');
        sessionStorage.setItem('dragTop', 'no');
    } else{
        if (sessionStorage.getItem('dragLeft') != 'no'){
            chatWindow.style.position = 'fixed';
            chatWindow.style.bottom = "auto";
            chatWindow.style.right = "auto";
            chatWindow.style.left = sessionStorage.getItem('dragLeft');
            chatWindow.style.top = sessionStorage.getItem('dragTop');
        }
    }
}


function minimizeButton() {
    chatMinimize.hidden =  !chatMinimize.hidden;
    minimizeBtn.value = minimizeBtn.value == "-" ? "[]" : "-";
    sessionStorage.setItem('isHidden', chatMinimize.hidden);
}

function sendButton() {
    let msg = message.value;
    //проверка ввода имени пользователя
    if (sessionStorage.getItem('userName') == ""){
        if (msg != ""){
            message.value = "";
            sessionStorage.setItem('userName', msg);
            writeToMessageOutput("", "Your name is " + msg);
            return;
        } else {
            return;
        }
    }
    if (msg != ""){
        message.value = "";
        //sendToServer(msg);
        let url = "http://localhost:8080/messages/";
        let type = "GET";
        let mesage = {};
        function func(json){alert(toString(json))};
        XHRRequestToServer(url, type, mesage, func);
        writeToMessageOutput(sessionStorage.getItem('userName'), msg);
    }
}

function writeToMessageOutput(from, message) {
    if (TSChat.showTime){
        let date = new Date();
        messageOutput.value += date.getHours() + ":" + date.getMinutes() + " " + from + " : " + message + "\r\n";
    } else{
        messageOutput.value += from + " : " + message + "\r\n";

    }
    sessionStorage.setItem('messages', messageOutput.value);
}



function sendToServer(url, type, message, func){
    if (TSChat.connectType == "xhr"){
        XHRRequestToServer(url, type, message, func);
    } else{
        FetchRequestToServer()
    }
}


/*
let msg = {};
    msg.text = str;
*/



function XHRRequestToServer(url, type, func, message) {
    
    let xhr = new XMLHttpRequest();
    xhr.open("type", url)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify(message));
    xhr.onload = function() {
        let json = JSON.parse(xhr.response);
        func(json);
        //writeToMessageOutput(TSChat.botName, json.text);
    };
    xhr.onerror = function() { 
        console.log(`Ошибка соединения`);
    };
}

/*
let msg = {};
    msg.text = str;
*/
async function FetchRequestToServer(url, type, func, message) {
    
    let response = await fetch(url,{
        method: type,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(message)
    });
    if (response.ok) { 
      let json = await response.json();
      func(json);
      //writeToMessageOutput(TSChat.botName,json.text);
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }   
}
