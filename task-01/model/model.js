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

function sendToServer(str) {
	setTimeout(writeToMessageOutput, 15000, "Bot", "Ответ на: " + str.toUpperCase());
}