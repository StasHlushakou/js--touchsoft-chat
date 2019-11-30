let operator = {};
operator.chatURL = "http://localhost:8080";
operator.users = [];
operator.userMessages = [];
operator.selectUser = {};
//operator.messagesArr = [];
operator.isUpdateMessages = false;
init();



function writeToUsersBorard(user){
    for (let us of operator.users){
        if (user.id == us.id){
            return;
        }
    }
    operator.users.push(user)
    let option = document.createElement('option');
    option.value = user.id;
    option.append(user.name);
    userSelect.append(option);
}

function addToUsersBoard(users){
    users.forEach(writeToUsersBorard);
}

function updateUsers() {
    requestToServer("GET", operator.chatURL + "/users", null, addToUsersBoard);
}




filter.onchange = function() {
    
    console.log(operator.selectUser.id);
};

sort.onchange = function() {
    
    console.log(operator.selectUser.id);
};

userSelect.onchange = function() {
    
    messageOutput.value = "";
    activeUser.hidden = false;
    //operator.messagesArr = [];

    let us = operator.users.find(item => item.id == userSelect.value);
    operator.selectUser.id = us.id;
    operator.selectUser.name = us.name;
    operator.selectUser.botname = us.botname;
    
    console.log(operator.selectUser.id);
    dounloadHistoryMessages(operator.selectUser);
    operator.isUpdateMessages = true;
};

function closeActiveUser() {
    operator.selectUser = {};
    activeUser.hidden = true;
    operator.isUpdateMessages = false;
};


// реализация отправки запроса на сервер
function requestToServer(method, url, json, func) {    
    xhrRequestToServer(method, url, json, func);
}


// функция создания xhr-запроса
function xhrRequestToServer(method, url, json, func) {    
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    if (json != null){
        xhr.send(JSON.stringify(json));
    } else{
        xhr.send();
    }
    xhr.onload = function() {
        if (func != null){
            let jsonResp = JSON.parse(xhr.response);
            //console.log(jsonResp);
            func(jsonResp);
        }
    };
    xhr.onerror = function() { 
        console.log(`Ошибка соединения`);
    };
}








// обработка нажатия кнопки отправки сообщения
function sendButton() {
    // обработка вводимых сообщений
    if (message.value != ""){
        let msg = {};
        msg.userid = operator.selectUser.id;
        msg.username = "Admin";
        let date = new Date();
        msg.time = date.getHours() + ":" + date.getMinutes();
        msg.text = message.value;
        msg.read = false;
        requestToServer("POST", operator.chatURL + "/messages", msg, null);
        message.value = "";
    }
}






// запись в поле вывода сообщения
function writeToMessageOutput(message) {
    /*
    for (let msg of operator.messagesArr){
        if (msg.id == message.id){
            return;
        }
    }
    */
    //operator.messagesArr.push(message);
    let isRead = message.read ? "Прочитано   " : "Не прочитано";
    messageOutput.value += isRead + " " + message.time + " " + message.username + ":" + message.text + "\r\n";
}


// Загружает историю сообщений переданного пользователя
function dounloadHistoryMessages(user){
    
    requestToServer("POST", operator.chatURL + "/messages/users", user, addHistoryMessages);
}

// Добавляет все сообщения из массива в поле вывода
function addHistoryMessages(messagesArr){
    messageOutput.value = "";
    messagesArr.forEach(writeToMessageOutput);
}


function updateMessages(){
    if (operator.isUpdateMessages){
        dounloadHistoryMessages(operator.selectUser);
    } 
}


// инициализация скрипта при первой загрузке или перезагрузке страницы
function init(){
    updateUsers();
    let timerUpdateUsers = setInterval(updateUsers, 10000);
    let timerUpdateMessages = setInterval(updateMessages, 1000);
}