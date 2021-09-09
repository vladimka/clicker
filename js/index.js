function doMoney(){
    user.balance += user.coinsPerClick;
}

function doUpgrade(index){
    let upgrade = user.upgrades[index];

    if(user.balance < upgrade.cost) return;

    upgrade.value++;
    user.balance -= upgrade.cost;
    upgrade.cost *= upgrade.costMultiplier;
    upgrade.cost = Math.floor(upgrade.cost);
    
    if(upgrade.bonusType == 'cpc')
        user.coinsPerClick += upgrade.bonus;
    if(upgrade.bonusType == 'ts')
        user.timeSpeed += upgrade.bonus;
    if(upgrade.bonusType == 'cps')
        user.coinsPerSecond += upgrade.bonus;
}

const prestigeTabBtn = document.querySelector('.tab-button.prestige-tab');

function logic(){
    user.achievements.forEach((achievement, idx) => {
        if(achievement.has) return;
        if(!achievementConditions[idx]()) return;

        achievement.has = true;
        NotificationManager.add('Получено достижение: ' + achievement.name);
    });

    user.balance += user.coinsPerSecond * user.timeSpeed;
}

load();
firstRender();
setInterval(logic, 1e3);
setInterval(redraw, 100);
autosaveTimeout();