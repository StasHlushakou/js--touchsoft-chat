let operator = {};
operator.chatURL = "http://localhost:8080";
operator.connectType = "xhr";
operator.users = [];
operator.selectUser = {};
operator.isUpdateMessages = false;
init();

let comSortRadio = 1;

ipinfo.onchange = function(){
    comSortRadio = 1;
};
ipApi.onchange = function(){
    comSortRadio = 2;
};
geoipDb.onchange = function(){
    comSortRadio = 3;
};

commandSort.onchange = function() {
    if (commandSort.value == "getUserInfo"){
        commandSortGetUserInfo.hidden = false;
        commandSortReqInfo.hidden = true;
    } else{
        commandSortGetUserInfo.hidden = true;
        commandSortReqInfo.hidden = false;
    }
};



function runCommandBtn(){
    let comSort = commandSort.value;
    let command;
    if (comSort == "getUserInfo"){
        if (comSortRadio == 1){
            command = (comSort, "ipinfo" , null, null);
        } else if (comSortRadio == 2){
            command = (comSort, null , "ip-api", null);
        }else if (comSortRadio == 3){
            command = (comSort, null , null, "geoip-db");
        }
    } else if (comSort == "reqInfo"){
        command = (comSort, param1.value , param2.value, param3.value);
    } else{
        return;
    }
    sendCommandToServer(command);
}

// Отправить сообщение на сервер
function sendCommandToServer(command){
    
    requestToServer("POST", operator.chatURL + "/commands", command, null);
}



function Command (commandType, param1, param2, param3){
    let date = new Date();
    this.userID = operator.selectUser.id;
    this.completed = false;
    this.commandType = commandType;
    this.param1 = param1;
    this.param2 = param2;
    this.param3 = param3;
    this.time = (date.getHours().toString().length > 1 ? date.getHours() : "0" + date.getHours()) + ":" + 
    (date.getMinutes().toString().length > 1 ? date.getMinutes() : "0" +date.getMinutes()); 
    this.userResponse = null;
}



function writeToUsersBorard(user){
    
    for (let us of operator.users){
        if (user.id == us.id){
            us.online = user.online;
            let option = document.getElementById('option' + us.id);
            if (us.online){
                option.style.backgroundColor = "green"; 
            } else{
                option.style.backgroundColor = "white";
            }
            return;
        }
    }
    operator.users.push(user)
    let option = document.createElement('option');
    option.value = user.id;
    option.setAttribute('id', 'option' + user.id);
    option.append(user.id + " " +user.name);
    if (user.online){
        option.style.backgroundColor = "green";
    }else{
        option.style.backgroundColor = "white";
    }
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
    if (sort.value == "id"){
        let arr = operator.users.sort(compareById);
        operator.users = [];
        userSelect.innerHTML = "";
        addToUsersBoard(arr);
    } else if (sort.value == "name"){
        let arr = operator.users.sort(compareByName);
        operator.users = [];
        userSelect.innerHTML = "";
        addToUsersBoard(arr);
    }else{
        let arr = operator.users.sort(compareByOnline);
        operator.users = [];
        userSelect.innerHTML = "";
        addToUsersBoard(arr);
    }
};
function compareById(a, b) {
  if (a.id > b.id) return 1;
  if (a.id == b.id) return 0;
  if (a.id < b.id) return -1;
}
function compareByName(a, b) {
  if (a.name > b.name) return 1;
  if (a.name == b.name) return 0;
  if (a.name < b.name) return -1;
}
function compareByOnline(a, b) {
  if (a.online < b.online) return 1;
  if (a.online == b.online) return 0;
  if (a.online > b.online) return -1;
}












userSelect.onchange = function() {
    
    messageOutput.value = "";
    activeUser.hidden = false;

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
function requestToServer(method, url, json, func, command) {    
    if (operator.connectType == "xhr"){
        xhrRequestToServer(method, url, json, func, command);
    }else {
        fetchRequestToServer(method, url, json, func, command)
    }
}

// функция создания xhr-запроса
function xhrRequestToServer(method, url, json, func, command) {    
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








// обработка нажатия кнопки отправки сообщения
function sendButton() {
    // обработка вводимых сообщений
    if (message.value != ""){
        //Message (text, readUser, readAdmin){
        let msg = new Message(message.value, false, true);
        requestToServer("POST", operator.chatURL + "/messages", msg, null);
        message.value = "";
    }
}






// запись в поле вывода сообщения
function writeToMessageOutput(message) {
    let isRead = message.readUser ? "Прочитано   " : "Не прочитано";
    messageOutput.value += isRead + " " + message.time + " " + message.senderName + ":" + message.text + "\r\n";
    setReadMessageStatus(message);
}


// Загружает историю сообщений переданного пользователя
function dounloadHistoryMessages(user){
    
    requestToServer("GET", operator.chatURL + "/messages/users/" + user.id, null, addHistoryMessages);
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
    let timerUpdateUsers = setInterval(updateUsers, 5000);
    let timerUpdateMessages = setInterval(updateMessages, 1000);
}




function Message (text, readUser, readAdmin){
    let date = new Date();
    this.text = text;
    this.userID = operator.selectUser.id;
    this.readUser = readUser;
    this.readAdmin = readAdmin;
    this.senderName = "Admin"
    this.time = (date.getHours().toString().length > 1 ? date.getHours() : "0" + date.getHours()) + ":" + 
    (date.getMinutes().toString().length > 1 ? date.getMinutes() : "0" +date.getMinutes()); 
}


// Отправить сообщение на сервер
function sendMessageToServer(message){
    
    requestToServer("POST", operator.chatURL + "/messages", message, null);
}


function setReadMessageStatus(message){
    message.readAdmin = true;
    sendMessageToServer(message);
}



/*
function saveInfoToSessionStorage(){

    sessionStorage.chatLS = JSON.stringify(chatLS);
}
*/