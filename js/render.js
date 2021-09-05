const upgradesTab = document.querySelector('.tab.upgrades-tab');
const achievementsTab = document.querySelector('.tab.achievements-tab');
const balanceSpan = document.getElementById('balance');
const coinsPerClickSpan = document.getElementById('coinsPerClick');
const coinsPerSecondSpan = document.getElementById('coinsPerSecond');
const autosaveStatus = document.getElementById('autosaveStatus');
let upgradeElements;
let achievementsElements;

function renderUpgrades(){
    user.upgrades.forEach((upgrade, index) => {
        upgradesTab.innerHTML += `
            <div class='upgrade tab-item' id='${index}-upgrade'>
                <p>${upgrade.displayName}</p>
                <p class="upgrade-cost">Цена: <span>${upgrade.cost}</span></p>
                <p class="upgrade-value">Куплено: <span>${upgrade.value}</span></p>
                <button onclick='doUpgrade(${index})'>Купить</button>
            </div>
        `;
    });

    upgradeElements = document.querySelectorAll('.upgrade');
}

function renderAchievements(){
    user.achievements.forEach((achievement, index) => {
        achievementsTab.innerHTML += `
            <div class='achievement ${achievement.has ? 'completed' : ''} tab-item' id='${index}-achievement'>
                <h3 class='tab-header'>${achievement.name}</h3>
                <p>${achievement.description}</p>
            </div>
        `;
    });

    achievementsElements = document.querySelectorAll('.achievement');
}

function firstRender(){
    document.getElementById('autosaveInterval').value = user.autosaveInterval;
    renderUpgrades();
    renderAchievements();
}

function redraw(){
    balanceSpan.innerText = user.balance.toFixed(2);
    coinsPerSecondSpan.innerText = user.coinsPerSecond.toFixed(2);
    coinsPerClickSpan.innerText = user.coinsPerClick.toFixed(2);
    autosaveStatus.innerText = user.autosaveEnabled ? 'Включено' : 'Выключено';

    upgradeElements.forEach(upgradeElement => {
        let upgradeId = parseInt(upgradeElement.id.split('-')[0]);
        let upgrade = user.upgrades[upgradeId];

        upgradeElement.querySelector('.upgrade-cost>span').innerText = upgrade.cost.toFixed(2);
        upgradeElement.querySelector('.upgrade-value>span').innerText = upgrade.value.toFixed(0);
    });

    achievementsElements.forEach(achievementElement => {
        let index = parseInt(achievementElement.id.split('-')[0]);;
        let achievement = user.achievements[index];

        if(achievement.has)
            achievementElement.classList.add('active');
    });
}