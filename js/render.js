const upgradesTab = document.querySelector('.tab.upgrades-tab');
const prestigeUpgradesTab = document.querySelector('.tab.prestige-tab');
const achievementsTab = document.querySelector('.tab.achievements-tab');
const balanceSpan = document.getElementById('balance');
const coinsPerClickSpan = document.getElementById('coinsPerClick');
const coinsPerSecondSpan = document.getElementById('coinsPerSecond');
const autosaveStatus = document.getElementById('autosaveStatus');
let ppGain, pp;
const timeSpeedP = document.getElementById('timeSpeedP');
const timeSpeed = document.getElementById('timeSpeed');
let upgradeElements;
let prestigeUpgradesElements;
let achievementsElements;

function renderUpgrades(){
    user.upgrades.forEach((upgrade, index) => {
        upgradesTab.innerHTML += `
            <div class='upgrade tab-item' id='${index}-upgrade'>
                <p>${upgrade.displayName}</p>
                <p class="upgrade-cost">Цена: <span>${upgrade.cost.toFixed(0)}</span></p>
                <p class="upgrade-value">Куплено: <span>${upgrade.value}</span></p>
                <button onclick='doUpgrade(${index})'>Купить</button>
            </div>
        `;
    });

    upgradeElements = document.querySelectorAll('.upgrade');
}

function renderPrestigeUpgrades(){
    user.prestigeUpgrades.forEach((upgrade, index) => {
        prestigeUpgradesTab.innerHTML += `
            <div class='prestigeUpgrade tab-item' id='${index}-upgrade'>
                <p>${upgrade.displayName}</p>
                <p class="prestige-upgrade-cost">Цена: <span>${upgrade.cost.toFixed(0)}</span></p>
                <p class="prestige-upgrade-value">Куплено: <span>${upgrade.value}</span></p>
                <button onclick='doPrestigeUpgrade(${index})'>Купить</button>
            </div>
        `;
    });

    prestigeUpgradesElements = document.querySelectorAll('.prestigeUpgrade');
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
    renderPrestigeUpgrades();
    renderAchievements();
    pp = document.querySelector('#prestigePoints');
    ppGain = document.querySelector('#pp-gain');
}

function redraw(){
    balanceSpan.innerText = user.balance.toFixed(0);
    coinsPerSecondSpan.innerText = user.coinsPerSecond * user.timeSpeed;
    coinsPerClickSpan.innerText = user.coinsPerClick.toFixed(0);
    autosaveStatus.innerText = user.autosaveEnabled ? 'Включено' : 'Выключено';
    ppGain.innerText = countPpGain();
    pp.innerText = user.prestigePoints;
    timeSpeed.innerText = user.timeSpeed;

    upgradeElements.forEach(upgradeElement => {
        let upgradeId = parseInt(upgradeElement.id.split('-')[0]);
        let upgrade = user.upgrades[upgradeId];

        upgradeElement.querySelector('.upgrade-cost>span').innerText = upgrade.cost.toFixed(0);
        upgradeElement.querySelector('.upgrade-value>span').innerText = upgrade.value.toFixed(0);
    });

    prestigeUpgradesElements.forEach(upgradeElement => {
        let upgradeId = parseInt(upgradeElement.id.split('-')[0]);
        let upgrade = user.prestigeUpgrades[upgradeId];

        upgradeElement.querySelector('.prestige-upgrade-cost>span').innerText = upgrade.cost.toFixed(0);
        upgradeElement.querySelector('.prestige-upgrade-value>span').innerText = upgrade.value.toFixed(0);
    });

    if(prestigeTabBtn.style.display == 'none' && (countPpGain() >= 1 || user.prestigePoints > 0 || user.totalPrestiged > 0))
        prestigeTabBtn.style.display = 'block';

    if(timeSpeedP.style.display == 'none' && (user.timeSpeed > 1))
        timeSpeedP.style.display = 'block';

    achievementsElements.forEach(achievementElement => {
        let index = parseInt(achievementElement.id.split('-')[0]);;
        let achievement = user.achievements[index];

        if(achievement.has)
            achievementElement.classList.add('active');
    });
}