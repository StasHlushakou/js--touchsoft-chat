let _chatTitle = "Chat";
let _botName = "Bot";
let _chatURL = "http://localhost:8080/chatJS";
let _CSSClass = "model.css";
let _position = "right";
let _allowMinimize = false;
let _allowDrag = false;
let _requireName = false;
let _showTime = false;
let _connectType = "XHR";


chatTitle.onchange = function() {
    _chatTitle = chatTitle.value;
    alert(_chatTitle);
};

botName.onchange = function() {
    _botName = botName.value;
    alert(_botName);

    //alert(botName.value);
};

chatURL.onchange = function() {
    _chatURL = chatURL.value;
    alert(_chatURL);

    //alert(chatURL.value);
};

CSSClass.onchange = function() {
    _CSSClass = CSSClass.value;
    alert(_CSSClass);

    //alert(CSSClass.value);
};

//-----------------------------------

position.onchange = function() {
    _position = position.value;
    alert(_position);

    //alert(position.value);
};

//-----------------------------------

allowMinimize.onchange = function() {
    _allowMinimize = allowMinimize.checked;
    alert(_allowMinimize + typeOf(_allowMinimize));

    alert(allowMinimize.checked);
};

allowDrag.onchange = function() {
    _chatTitle = chatTitle.value;
    alert(_chatTitle);

    alert(allowDrag.checked);
};

requireName.onchange = function() {
    _chatTitle = chatTitle.value;
    alert(_chatTitle);

    alert(requireName.checked);
};

showTime.onchange = function() {
    _chatTitle = chatTitle.value;
    alert(_chatTitle);

    alert(showTime.checked);
};

//-----------------------------------

useXHR.onchange = function() {
    _chatTitle = chatTitle.value;
    alert(_chatTitle);alert(useXHR.value);


};

usefetch.onchange = function() {
    _chatTitle = chatTitle.value;
    alert(_chatTitle);

    alert(usefetch.value);
};

















/*

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


 	//Для использования fetch() вместо XHR раскомментировать
 	//async в описании метода sendToServer() и код метода заменить на тот,
 	//который в комментарии.
 

//async
function sendToServer(str) {
	
	
	//let msg = {};
	//msg.text = str;
	//let url = `http://localhost:8080/chatJS`;
	//let response = await fetch(url,{
  	//	method: 'POST',
  	//	headers: {
    //		'Content-Type': 'application/json;charset=utf-8'
  	//	},
  	//	body: JSON.stringify(msg)
	//});
	//if (response.ok) { 
	//  let json = await response.json();
	//  writeToMessageOutput("Bot",json.text);
	//} else {
	//  console.log("Ошибка HTTP: " + response.status);
	//}
	
	
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
*/