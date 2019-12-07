handleUrl(window.location.hash);

function viewDashboard(){
    let url = "dashboard";
    window.location.hash = url;
	dashboard.hidden = false;
    chatConfigurator.hidden = true;
    about.hidden = true;
}

function viewConfiguration(){
    let url = "config";
    window.location.hash = url;
    dashboard.hidden = true;
    chatConfigurator.hidden = false;
    about.hidden = true;
}

function viewAbout(){
    let url = "about";
    window.location.hash = url;
    dashboard.hidden = true;
    chatConfigurator.hidden = true;
    about.hidden = false;
}

function handleUrl(url) {
    if (url == "#config"){
        viewConfiguration();
    } else if (url == "#dashboard"){
        viewDashboard();
    }else if (url == "#about"){
        viewAbout();
    }
}