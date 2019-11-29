
if (sessionStorage.getItem('isHidden') == null){
	sessionStorage.setItem('isHidden', true);
} else{
	if (sessionStorage.getItem('isHidden') == "false"){
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
	sessionStorage.setItem('isHidden', chatMinimize.hidden);
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
/*

 	Для использования fetch() вместо XHR раскомментировать
 	async в описании метода sendToServer() и код метода заменить на тот,
 	который в комментарии.
 */

async function sendToServer(str) {
	
	
	let msg = {};
	msg.id = 0;
	let url = `http://localhost:8080/messages`;
	let response = await fetch(url,{
  		method: 'GET',
  		headers: {
    		'Content-Type': 'application/json;charset=utf-8'
  		},
  		//body: JSON.stringify(msg)
	});
	if (response.ok) { 
	  let json = await response.json();
	  console.log(json);
	  writeToMessageOutput("Bot",json.text);
	} else {
	  console.log("Ошибка HTTP: " + response.status);
	}
	
	
	/*
	let msg = {};
	msg.id = 0;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", `http://localhost:8080/messages/users`)
	xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
	xhr.send(JSON.stringify(msg));
	xhr.onload = function() {
	  	let json = JSON.parse(xhr.response);
	 	console.log(json)
	 	writeToMessageOutput("Bot", json.text);
	};
	xhr.onerror = function() { 
	  	console.log(`Ошибка соединения`);
	};
	*/
	
}