// При загрузке страницы - считать состояние и запустить обработчик
handleUrl(window.location.hash);


// Создать обработчик URL
function handleUrl(url) {
    if (url == "#config"){
        viewConfiguration();
    } else if (url == "#dashboard"){
        viewDashboard();
    }else if (url == "#about"){
        viewAbout();
    }
}


function viewConfiguration(){
    let url = "config";
    window.location.hash = url;

    console.log("config");
}

function viewDashboard(){
    let url = "dashboard";
    window.location.hash = url;

    console.log("dashboard");
}

function viewAbout(){
    let url = "about";
    window.location.hash = url;

    console.log("about");
}














//var counter = document.querySelector('#counter');
//var content = document.querySelector('#content');
//setInterval(() => counter.innerText = new Date(), 1000);


// Подписаться на изменения URL
//window.addEventListener('hashchange', (ev) => handleUrl(ev.newURL));

/*
// Переопределить поведение внутренних ссылок
document.body.addEventListener('click', (ev) => {
    if(!ev.target.matches('a')) {
        return;
    }
    ev.preventDefault();

    // При клике по ссылке - обновлять URL
    let url = ev.target.getAttribute('href');
    window.location.hash = url;
});
*/