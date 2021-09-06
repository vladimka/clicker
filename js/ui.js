let notificationsUl = document.getElementsByClassName('notifications')[0];

class NotificationManager{
    static add(text){
        notificationsUl.innerHTML += `<div class='notification'>${text}</div>`;
        setTimeout(() => NotificationManager.removeLast(), 5e3);
    }

    static removeLast(){
        let notifs = notificationsUl.getElementsByClassName('notification');
        let lastNotif = notifs[notifs.length-1];

        lastNotif.style.opacity = 0;
        setTimeout(() => notificationsUl.removeChild(lastNotif), 4e2);
    }
}

function setTab(tabId){
    document.querySelector('.tab.active').classList.remove('active');
    document.querySelector('.tab-button.active').classList.remove('active');

    document.querySelector(`.tab.${tabId}`).classList.add('active');
    document.querySelector(`.tab-button.${tabId}`).classList.add('active');
}

function toggleTheme(){
    let themeLink = document.getElementById('themeLink');
    let href = themeLink.href.match(/css\/.*/)[0];

    if(href == 'css/light_theme.css') themeLink.href = 'css/dark_theme.css';
    else if(href == 'css/dark_theme.css') themeLink.href = 'css/light_theme.css';
}