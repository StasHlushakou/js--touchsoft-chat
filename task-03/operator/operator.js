let operstor = {};
operstor.chatURL = "http://localhost:8080";
operstor.users = null;

init();


function writeToUsersBorard(user){
    let option = document.createElement('option');
    option.value = user.id;
    option.append(user.name);
    userSelect.append(option);
}


userSelect.onchange = function() {
    alert();
};



/*
let user = {};
writeToUsersBorard(user);
*/

function addToUsersBoard(users){
    operstor.users = users;
    users.forEach(writeToUsersBorard);
}





// инициализация скрипта при первой загрузке или перезагрузке страницы
function init(){
    requestToServer("GET", operstor.chatURL + "/users", null, addToUsersBoard);


    //let timerId = setInterval(updateUsers, 1000);
}




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
            console.log(jsonResp);
            func(jsonResp);
        }
    };
    xhr.onerror = function() { 
        console.log(`Ошибка соединения`);
    };
}


function updateMessages(){
    let user = {};
    user.id = sessionStorage.getItem('userid');
    requestToServer("POST", TSChat.chatURL + "/messages/users/unread", user, addHistoryMessages);
}