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

function logic(){
    user.achievements.forEach((achievement, idx) => {
        if(achievement.has) return;
        if(!achievementConditions[idx]()) return;

        achievement.has = true;
        NotificationManager.add('Получено достижение: ' + achievement.name);
    });

    user.balance += user.coinsPerSecond;
}

load();
firstRender();
setInterval(logic, 1e3);
setInterval(redraw, 100);
autosaveTimeout();