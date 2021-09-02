let user = load();

function save(){
    localStorage.setItem('clicker-save', JSON.stringify(user));
    NotificationManager.add('Saved!');
}

function load(){
    let save = JSON.parse(localStorage.getItem('clicker-save'));

    if(save == undefined || save == null || save == {})
        save = {
            balance : 0,
            coinsPerClick : 1,
            coinsPerSecond : 0,
            upgrades : [
                {
                    displayName : '+1 finger',
                    value : 0,
                    cost : 30,
                    costMultiplier : 1.17,
                    bonusType : 'cpc',
                    bonus : 1
                },
                {
                    displayName : 'auto finger',
                    value : 0,
                    cost : 200,
                    costMultiplier : 1.17,
                    bonusType : 'cps',
                    bonus : 1
                }
            ]
        }

    return save;
}

function btnLoad(){
    user = load();
}

function doMoney(){
    user.balance += user.coinsPerClick;
}

function doUpgrade(index){
    let upgrade = user.upgrades[index];

    if(user.balance < upgrade.cost) return;

    upgrade.value++;
    user.balance -= upgrade.cost;
    upgrade.cost *= upgrade.costMultiplier;
    upgrade.bonusType == 'cpc'
        ? user.coinsPerClick += upgrade.bonus
        : user.coinsPerSecond += upgrade.bonus;
}

let upgradesTab = document.getElementById('upgrades');
let balanceSpan = document.getElementById('balance');
let coinsPerClickSpan = document.getElementById('coinsPerClick');
let coinsPerSecondSpan = document.getElementById('coinsPerSecond');
let notificationsUl = document.getElementsByClassName('notifications')[0];
let upgradeElements;

function renderUpgrades(){
    user.upgrades.forEach((upgrade, index) => {
        upgradesTab.innerHTML += `
            <div class='upgrade tab-item' id='${index}-upgrade'>
                <p>${upgrade.displayName}</p>
                <p class="upgrade-cost">Cost: <span>${upgrade.cost}</span></p>
                <p class="upgrade-value">Value: <span>${upgrade.value}</span></p>
                <button onclick='doUpgrade(${index})'>Buy</button>
            </div>
        `;
    });

    upgradeElements = document.querySelectorAll('.upgrade');
}

function redraw(){
    balanceSpan.innerText = user.balance.toFixed(2);
    coinsPerSecondSpan.innerText = user.coinsPerSecond.toFixed(2);
    coinsPerClickSpan.innerText = user.coinsPerClick.toFixed(2);
    upgradeElements.forEach(upgradeElement => {
        let upgradeId = parseInt(upgradeElement.id.split('-')[0]);
        let upgrade = user.upgrades[upgradeId];

        upgradeElement.querySelector('.upgrade-cost>span').innerText = upgrade.cost.toFixed(2);
        upgradeElement.querySelector('.upgrade-value>span').innerText = upgrade.value.toFixed(0);
    });
}

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

renderUpgrades();
setInterval(() => user.balance += user.coinsPerSecond, 1e3);
setInterval(redraw, 100);
setInterval(() => save(), 1e4);