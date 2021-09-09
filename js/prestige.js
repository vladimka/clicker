const countPpGain = () => Math.max(0, (Math.log(user.balance)/Math.log(10))-3);

const prestigeUpgradeHandlers = [
    () => user.timeSpeedBuyed = true
]

function doPrestigeUpgrade(index){
    let upg = user.prestigeUpgrades[index];

    if(user.prestigePoints < upg.cost)
        return;

    upg.value++;
    user.prestigePoints -= upg.cost;
    upg.cost *= upg.costMultiplier;
    upg.cost = Math.floor(upg.cost);
    prestigeUpgradeHandlers[index]();
}

function prestige(){
    if(countPpGain() < 1)
        return;

    user.prestigePoints += countPpGain();
    user.totalPrestiged++;

    user.upgrades.forEach((upg, i) => {
        upg.cost = initialSave.upgrades[i].cost;
        upg.value = 0;
    });
    
    user.coinsPerClick = 1;
    user.coinsPerSecond = 0;
    user.balance = 0;

    setTab('upgrades-tab');
}