//'use strict';
let chatLS = {};
init();

/**
 * Handles clicking a minimize button.
 */
function minimizeButton() {
    chatMinimize.hidden =  !chatMinimize.hidden;
    minimizeBtn.value = minimizeBtn.value == "-" ? "[]" : "-";
    chatLS.isHidden = chatMinimize.hidden;
    saveInfoToSessionStorage();
}

/**
 * Handles the push of a message send button
 */
function sendButton() {
    // Verify username if required
    if (!chatLS.userName){
        if (message.value != ""){
            chatLS.userName = message.value;
            saveInfoToSessionStorage();
            message.value = "";
            regNewUser(chatLS.userName);
            addServiceMessage("Your name is " + chatLS.userName);
            return;
        } else {
            return;
        }
    }
    // обработка вводимых сообщений
    if (message.value != ""){
        let msg = new Message(message.value, true, false);
        sendMessageToServer(msg);
        //writeToMessageOutput(msg);
        message.value = "";
    }
}

/**
 * 
 */
window.onunload = function () {
  	if (chatLS.user){
		chatLS.user.online = false;
  		var blob = new Blob([JSON.stringify(chatLS.user)], {type: 'text/plain; charset=UTF-8'});
		navigator.sendBeacon(TSChat.chatURL + "/users", blob);
	}
};


function saveInfoToSessionStorage(){

	sessionStorage.chatLS = JSON.stringify(chatLS);
}


/**
 * Sends a message to the server to set the user status online / offline.
 * @param {string} user - The user whose status is to be set.
 * @param {boolean} status - Status online/offline.
 */
function setOnlineUserStatus(user){
	user.online = true;
	requestToServer("POST", TSChat.chatURL + "/users", user, null);
	
}



/**
 * Output service information in the output field.
 * @param {string} str - String from output.
 */
function addServiceMessage(str){
	messageOutput.value += str + "\n";
	chatLS.messages = messageOutput.value;
	saveInfoToSessionStorage();
}

function setReadMessageStatus(message){
	message.readUser = true;
	sendMessageToServer(message);
}

// запись в поле вывода сообщения
function writeToMessageOutput(message) {
    let isRead = message.readAdmin ? "Прочитано    " : "Не прочитано ";
    if (TSChat.showTime){
        messageOutput.value += isRead + message.time + " " + message.senderName + ":" + message.text + "\n";
    } else{
        messageOutput.value += isRead + message.senderName + ":" + message.text + "\n";
    }
    chatLS.messages = messageOutput.value;
    saveInfoToSessionStorage();
    if (!message.readUser){
    	setReadMessageStatus(message);       	
    }
}

// Добавляет все сообщения из массива в поле вывода
function addHistoryMessages(messagesArr){
	messageOutput.value = "";
	messagesArr.forEach(writeToMessageOutput);
}

// Загружает историю сообщений переданного пользователя
function dounloadHistoryMessages(user){
	
	requestToServer("GET", TSChat.chatURL + "/messages/users/" + user.id, null, addHistoryMessages);
}

// Устанавливает id пользователя, полученного с сервера и запускает загрузку его сообщений
function setUser(user){
	chatLS.user = user;
	saveInfoToSessionStorage();
	dounloadHistoryMessages(user);
	chatLS.user.online = true;
	chatLS.user.botName = TSChat.botName;
	setOnlineUserStatus(chatLS.user);
}

// Регистрирует нового пользователя или получает данные старого по его имени с сервера
function regNewUser(username){
	let user = {};
	user.name = username;
	requestToServer("POST", TSChat.chatURL + "/users/reg", user, setUser);
}

// Отправить сообщение на сервер
function sendMessageToServer(message){
	
	requestToServer("POST", TSChat.chatURL + "/messages", message, null);
}

// реализация отправки запроса на сервер
function requestToServer(method, url, json, func, command) {    
    if (TSChat.connectType == "xhr"){
    	xhrRequestToServer(method, url, json, func, command);
    }else {
    	fetchRequestToServer(method, url, json, func, command)
    }
}

// функция создания xhr-запроса
function xhrRequestToServer(method, url, json, func, command) {    
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (method == "POST"){
    	xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    }
    if (json != null){
    	xhr.send(JSON.stringify(json));
    } else{
    	xhr.send();
    }
    xhr.onload = function() {
        if (func != null){
	        let jsonResp = JSON.parse(xhr.response);
	        func(jsonResp, command);
        }
    };
    xhr.onerror = function() { 
        console.log(`Ошибка соединения`);
    };
}

// функция создания fetch-запроса
async function fetchRequestToServer(method, url, json, func, command) {
	if (method == "GET"){
		let response = await fetch(url);
	    if (response.ok) { 
	      let jsonResp = await response.json();
	      func(jsonResp, command);
	      
	    } else {
	      console.log("Ошибка HTTP: " + response.status);
	    }   
	} else {
		let response = await fetch(url,{
	        method: method,
	        headers: {
	            'Content-Type': 'application/json;charset=utf-8'
	        },
	        body: JSON.stringify(json)
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
	if (chatLS.user){
		//requestToServer("GET", TSChat.chatURL + "/messages/users/userunread/" + chatLS.user.id , null, addHistoryMessages);
		requestToServer("GET", TSChat.chatURL + "/messages/users/" + chatLS.user.id, null, addHistoryMessages);
	}
}


function updateCommands(){
	if (chatLS.user){
		requestToServer("GET", TSChat.chatURL + "/commands/users/notcompleted/" + chatLS.user.id , null, executeCommands);
	}
}

function executeCommands(commandsArr){
	
	commandsArr.forEach(executeCommand);
}


function executeCommand(command){
	if (command.commandType == "getUserInfo"){
		console.log("getUserInfo");
		if (command.param1 == "ipinfo"){
			requestToServer("GET", "https://ipinfo.io/json/", null , setComandStatus, command);

		} else if (command.param2 == "ip-api"){
			requestToServer("GET", "http://ip-api.com/json/", null , setComandStatus, command);

		} else if (command.param3 == "geoip-db"){
			requestToServer("GET", "https://geolocation-db.com/json/", null , setComandStatus, command);
		} else {
			setComandStatus("Invalid command parameters", command);
			console.log("неверные параметры");
		}
		
	} else if (command.commandType == "reqInfo"){
		console.log("reqInfo");
		myPrompt(command.param1, command.param2, command.param3, command);
	}
}

function myPrompt(headline, msgText, placeholder, command){
	let userResponse = prompt(headline + "\n" + msgText, placeholder);
	setComandStatus(userResponse, command);
}


function setComandStatus(userResponse, command){
	if (typeof(userResponse) == "object"){
		command.userResponse = JSON.stringify(userResponse);
	} else {
		command.userResponse = userResponse;
	}
	command.completed = true;
	requestToServer("POST", TSChat.chatURL + "/commands", command , null);
}

function Message (text, readUser, readAdmin){
	let date = new Date();
    this.text = text;
    this.userID = chatLS.user.id;
    this.readUser = readUser;
	this.readAdmin = readAdmin;
    this.senderName = chatLS.userName;
    this.time = (date.getHours().toString().length > 1 ? date.getHours() : "0" + date.getHours()) + ":" + 
    (date.getMinutes().toString().length > 1 ? date.getMinutes() : "0" +date.getMinutes()); 
}

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

	// загрузка сохранённых данных из локального хранилища
	if (!sessionStorage.getItem('chatLS')){
		chatLS.isHidden = true;
		chatLS.messages = "";
		//проверка требования ввода имени
		if (TSChat.requireName){
	        chatLS.userName = "";
	        addServiceMessage("Please, enter your name.");
	    } else {
	        chatLS.userName = "Вы";
	        regNewUser(chatLS.userName);
	        addServiceMessage("Your name is " + chatLS.userName);
	    }
	    if(TSChat.allowDrag){
	    	chatLS.dragLeft = 'no';
	        chatLS.dragTop = 'no';
	    }
		saveInfoToSessionStorage();
    } else{
        chatLS = sessionStorage.chatLS ? JSON.parse(sessionStorage.chatLS) : [];
        messageOutput.value = chatLS.messages;
		if(TSChat.allowDrag){
			if (chatLS.dragLeft != 'no'){
	            chatWindow.style.position = 'fixed';
	            chatWindow.style.bottom = "auto";
	            chatWindow.style.right = "auto";
	            chatWindow.style.left = chatLS.dragLeft;
	            chatWindow.style.top = chatLS.dragTop;
	        }
		}
    }

	// проверка разрешения сворачивания чата и установка чату 
	// необходимого состояния после перезагрузки страницы
	if (!TSChat.allowMinimize){
	    chatMinimize.hidden = false;
	    minimizeBtn.disabled = true; 
	    minimizeBtn.value = "-"
	}else if (!chatLS.isHidden){
        minimizeButton();
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
	            chatLS.dragLeft = chatWindow.style.left; 
	            chatLS.dragTop = chatWindow.style.top;
	            saveInfoToSessionStorage();
	        };
	    };
	    heading.ondragstart = function() {
	      return false;
	    };
	}

	
	
	let msgUpdate = setInterval(updateMessages, 1000);
	let commandUpdate = setInterval(updateCommands, 10000);

	if (chatLS.user){
		let a = setTimeout(setOnlineUserStatus, 500, chatLS.user);
	}
}

