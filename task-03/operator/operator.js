let title = "Chat";
let botName = "Bot";
let chatURL = "http://localhost:8080/chatJS";
let cssClass = "model.css";
let position = "right";
let allowMinimize = false;
let allowDrag = false;
let requireName = false;
let showTime = false;
let connectType = "xhr";

writeToScriptToConnection();

chatTitleInput.onchange = function() {
    title = chatTitleInput.value;
    writeToScriptToConnection();
};

botNameInput.onchange = function() {
    botName = botNameInput.value;
    writeToScriptToConnection();
};

chatURLInput.onchange = function() {
    chatURL = chatURLInput.value;
    writeToScriptToConnection();
};

CSSClassInput.onchange = function() {
    cssClass = CSSClassInput.value;
    writeToScriptToConnection();
};

positionInput.onchange = function() {
    position = positionInput.value;
    writeToScriptToConnection();
};

allowMinimizeInput.onchange = function() {
    allowMinimize = allowMinimizeInput.checked;
    writeToScriptToConnection();
};

allowDragInput.onchange = function() {
    allowDrag = allowDragInput.checked;
    writeToScriptToConnection();
};

requireNameInput.onchange = function() {
    requireName = requireNameInput.checked;
    writeToScriptToConnection();
};

showTimeInput.onchange = function() {
    showTime = showTimeInput.checked;
    writeToScriptToConnection();
};

useXHRInput.onchange = function() {
    connectType = useXHRInput.value;
    writeToScriptToConnection();
};

usefetchInput.onchange = function() {
    connectType = usefetchInput.value;
    writeToScriptToConnection();
};

function writeToScriptToConnection() {
    scriptToConnection.value = `
    <script type="text/javascript">
		let title = "${title}";
		let botName = "${botName}";
		let chatURL = "${chatURL}";
		//let cssClass = "${cssClass}";
		let position = "${position}";
		let allowMinimize = ${allowMinimize};
		let allowDrag = ${allowDrag};
		let requireName = ${requireName};
		let showTime = ${showTime};
		let connectType = "${connectType}";
	</script>
	<script src="chat.js"></script>
    `;
}