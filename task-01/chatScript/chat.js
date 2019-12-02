init();

// обработка нажатия кнопки сворачивания
function minimizeButton() {
    chatMinimize.hidden =  !chatMinimize.hidden;
    minimizeBtn.value = minimizeBtn.value == "-" ? "[]" : "-";
    sessionStorage.setItem('isHidden', chatMinimize.hidden);
}

// обработка нажатия кнопки отправки сообщения
function sendButton() {
    // проверка ввода имени пользователя и его регистрация, если требуется
    if (sessionStorage.getItem('userName') == ""){
        if (message.value != ""){
            sessionStorage.setItem('userName', message.value);
            message.value = "";
            regNewUser(sessionStorage.getItem('userName'));
            addServiceMessage("Your name is " + sessionStorage.getItem('userName'));
            return;
        } else {
            return;
        }
    }
    // обработка вводимых сообщений
    if (message.value != ""){
        let msg = {};
	    msg.userid = sessionStorage.getItem('userid');
	    msg.username = sessionStorage.getItem('userName')
	    let date = new Date();
	    msg.time = date.getHours() + ":" + date.getMinutes();
	    msg.text = message.value;
		msg.read = true;
        sendMessageToServer(msg);
        writeToMessageOutput(msg);
        message.value = "";
    }
}

function setOnlineStatus(user){
	requestToServer("POST", TSChat.chatURL + "/users/online", user, null);
}


window.onunload = function() {
  TSChat.user.online = false;
  requestToServer("POST", TSChat.chatURL + "/users/online", TSChat.user, null, true);
};

// запись в поле вывода служебной информации
function addServiceMessage(str){

	messageOutput.value += str + "\r\n";
	sessionStorage.setItem('messages', messageOutput.value);
}

function setReadMessageStatus(message){
	message.read = true;
	sendMessageToServer(message);
}

// запись в поле вывода сообщения
function writeToMessageOutput(message) {
    if (TSChat.showTime){
        messageOutput.value += message.time + " " + message.username + ":" + message.text + "\r\n";
    } else{
        messageOutput.value += message.username + ":" + message.text + "\r\n";
    }
    sessionStorage.setItem('messages', messageOutput.value);
    if (message.read == false){
    	setReadMessageStatus(message);       	
    }
}

// Добавляет все сообщения из массива в поле вывода
function addHistoryMessages(messagesArr){

	messagesArr.forEach(writeToMessageOutput);
}

// Загружает историю сообщений переданного пользователя
function dounloadHistoryMessages(user){
	
	requestToServer("POST", TSChat.chatURL + "/messages/users", user, addHistoryMessages);
}

// Устанавливает id пользователя, полученного с сервера и запускает загрузку его сообщений
function setUser(user){
	TSChat.user = user;
	sessionStorage.setItem('userid', user.id);
	dounloadHistoryMessages(user);
	TSChat.user.online = true;
	setOnlineStatus(TSChat.user);
}

// Регистрирует нового пользователя или получает данные старого по его имени с сервера
function regNewUser(username){
	let user = {};
	user.name = username;
	user.botname = TSChat.botName;
	requestToServer("POST", TSChat.chatURL + "/users", user, setUser);
}

// Отправить сообщение на сервер
function sendMessageToServer(message){
	
	requestToServer("POST", TSChat.chatURL + "/messages", message, null);
}

// реализация отправки запроса на сервер
function requestToServer(method, url, json, func) {    
    if (TSChat.connectType == "xhr"){
    	xhrRequestToServer(method, url, json, func);
    }else {
    	fetchRequestToServer(method, url, json, func)
    }
}

// функция создания xhr-запроса
function xhrRequestToServer(method, url, json, func, keepalive) {    
    
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, !keepalive);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    if (json != null){
    	xhr.send(JSON.stringify(json));
    } else{
    	xhr.send();
    }
    xhr.onload = function() {
        if (func != null){
	        let jsonResp = JSON.parse(xhr.response);
	        func(jsonResp);
        }
    };
    xhr.onerror = function() { 
        console.log(`Ошибка соединения`);
    };
}

// функция создания fetch-запроса
async function fetchRequestToServer(method, url, json, func, keepalive) {
    
	if (method == "GET"){
		let response = await fetch(url);
	    if (response.ok) { 
	      let jsonResp = await response.json();
	      func(jsonResp);
	      
	    } else {
	      console.log("Ошибка HTTP: " + response.status);
	    }   
	} else {
		let response = await fetch(url,{
	        method: method,
	        headers: {
	            'Content-Type': 'application/json;charset=utf-8'
	        },
	        body: JSON.stringify(json),
	        keepalive : keepalive
	    });
	    if (response.ok) { 
	      if (func != null){
	      	let jsonResp = await response.json();
	      	func(jsonResp);
	      }
	      return;
	      
	    } else {
	      console.log("Ошибка HTTP: " + response.status);
	    }  
	}   
}

function updateMessages(){
	let user = {};
	user.id = sessionStorage.getItem('userid');
	requestToServer("POST", TSChat.chatURL + "/messages/users/unread", user, addHistoryMessages);
}

/*
function updateCommands(){
	let user = {};
	user.id = sessionStorage.getItem('userid');
	requestToServer("POST", TSChat.chatURL + "/commands/users/notdone", user, executeCommands);
}

function executeCommands(commandsArr){
	commandsArr.forEach(executeCommand);
}

function executeCommand(command){
	if (command.command == "getUserInfo"){
		requestToServer("GET", "https://geolocation-db.com/json", null , setComandStatus, false, command);
	}
}

function setComandStatus(userResponse, command){
	command.userResponse = userResponse;
	requestToServer("POST", TSChat.chatURL + "/commands", command , null);
}
*/



// инициализация скрипта при первой загрузке или перезагрузке страницы
function init(){
	let newDiv = document.createElement('div');
	newDiv.innerHTML = `<div id="chatWindow" class="${TSChat.cssClass}">
	    <h2 id="heading">chat</h2>
	    <input id="minimizeBtn" type="button" value="[]" onclick="minimizeButton()">
	    <div id="chatMinimize" hidden="true">
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
	        addServiceMessage("Please, enter your name.");
	    } else {
	        sessionStorage.setItem('userName', "Вы");
	        regNewUser(sessionStorage.getItem('userName'));
	        addServiceMessage("Your name is " + sessionStorage.getItem('userName'));
	    }
	}		

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

	let msgUpdate = setInterval(updateMessages, 1000);
	//let commandUpdate = setInterval(updateCommands, 1000);
}