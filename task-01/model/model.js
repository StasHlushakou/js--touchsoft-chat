if (sessionStorage.getItem('isMinimize') == null){
	sessionStorage.setItem('isMinimize', false);
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

/*async*/ function sendToServer(str) {
	
	/*
	let msg = {};
	msg.text = str;
	let url = `http://localhost:8080/chatJS`;
	let response = await fetch(url,{
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
	*/
	
	
	
	let msg = {};
	msg.text = str;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", `http://localhost:8080/chatJS`)
	xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
	xhr.send(JSON.stringify(msg));
	xhr.onload = function() {
	  	let json = JSON.parse(xhr.response);
	 	writeToMessageOutput("Bot",json.text);
	};
	xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
	  	console.log(`Ошибка соединения`);
	};
	

}