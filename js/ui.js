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
    if(document.body.classList.contains('dark'))
        return document.body.classList.remove('dark');

    document.body.classList.add('dark');
}