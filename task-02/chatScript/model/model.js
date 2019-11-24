let title = "Chat";
let botName = "Bot";
let chatURL = "http://localhost:8080/chatJS";
let cssClass = "model.css";	//??????
let position = "right";
let allowMinimize = true;
let allowDrag = true;			//??????
let requireName = true;
let showTime = false;
let connectType = "fetch";

// проверка разрешения сворачивания чата и установка чату 
// необходимого состояния после перезвгрузки страницы
if (!allowMinimize){
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

// заполнение формы вывода после перезагрузки страницы
if (sessionStorage.getItem('messages') == null){
	sessionStorage.setItem('messages', "");
} else{
	messageOutput.value = sessionStorage.getItem('messages');
}

// проверка привязки(right/left)
heading.textContent = title;
if (position == "left"){
	chatWindow.style.left="5px";
}

//выбор способа отправки сообщений на сервер
let sendToServer = null;
if (connectType == "xhr"){
	sendToServer = useXHR;
} else{
	sendToServer = useFetch;
}

// просьба ввести имя
let userName = "";
if (requireName){
	if (sessionStorage.getItem('userName') == null){
		sessionStorage.setItem('userName', "");
		writeToMessageOutput("", "Please, enter your name.");
	} else{
		userName = sessionStorage.getItem('userName');
	}
}

//установка нужного положения при обновлении страницы
if(allowDrag){
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
    if (requireName){
    	if (userName == ""){
    		if (msg != ""){
    			userName = msg;
    			message.value = "";
    			sessionStorage.setItem('userName', userName);
    			writeToMessageOutput("", "Your name is " + userName);
    			return;
    		} else {
    			return;
    		}
    	}
    }

    if (msg != ""){
    	message.value = "";
    	sendToServer(msg);
    	if (requireName){
    		writeToMessageOutput(userName, msg);
    	} else{
    		writeToMessageOutput("Вы", msg);
    	}
    }
}

function writeToMessageOutput(from, message) {
    if (showTime){
    	let date = new Date();
    	messageOutput.value += date.getHours() + ":" + date.getMinutes() + " " + from + " : " + message + "\r\n";
    } else{
   		messageOutput.value += from + " : " + message + "\r\n";

    }
    sessionStorage.setItem('messages', messageOutput.value);

}







function useXHR(str) {
	let msg = {};
	msg.text = str;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", chatURL)
	xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
	xhr.send(JSON.stringify(msg));
	xhr.onload = function() {
	  	let json = JSON.parse(xhr.response);
	 	writeToMessageOutput(botName, json.text);
	};
	xhr.onerror = function() { 
	  	console.log(`Ошибка соединения`);
	};
}

async function useFetch(str) {
	let msg = {};
	msg.text = str;
	let response = await fetch(chatURL,{
  		method: 'POST',
  		headers: {
    		'Content-Type': 'application/json;charset=utf-8'
  		},
  		body: JSON.stringify(msg)
	});
	if (response.ok) { 
	  let json = await response.json();
	  writeToMessageOutput("Bot",json.text);
	} else {
	  console.log("Ошибка HTTP: " + response.status);
	}	
}















if(allowDrag){

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



