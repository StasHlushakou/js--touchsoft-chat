let $chatTitle = "Chat";
let $botName = "Bot";
let $chatURL = "http://localhost:8080/chatJS";
let $CSSClass = "model.css";
let $position = "right";
let $allowMinimize = false;
let $allowDrag = false;
let $requireName = false;
let $showTime = false;
let $connectType = "xhr";


chatTitle.onchange = function() {
    $chatTitle = chatTitle.value;
    alert($chatTitle);
};

botName.onchange = function() {
    $botName = botName.value;
    alert($botName);

};

chatURL.onchange = function() {
    $chatURL = chatURL.value;
    alert($chatURL);

};

CSSClass.onchange = function() {
    $CSSClass = CSSClass.value;
    alert($CSSClass);

};

//-----------------------------------

position.onchange = function() {
    $position = position.value;
    alert($position);

};

//-----------------------------------

allowMinimize.onchange = function() {
    $allowMinimize = allowMinimize.checked;
    alert($allowMinimize);

};

allowDrag.onchange = function() {
    $allowDrag = allowDrag.checked;
    alert($allowDrag);

};

requireName.onchange = function() {
    $requireName = requireName.checked;
    alert($requireName);

};

showTime.onchange = function() {
    $showTime = showTime.checked;
    alert($showTime);

};

//-----------------------------------

useXHR.onchange = function() {
    $connectType = useXHR.value;
    alert($connectType);

};

usefetch.onchange = function() {
    $connectType = usefetch.value;
    alert($connectType);

};





function writeToScriptToConnection() {
    


    scriptToConnection.value += strScriptToConnection;

}













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