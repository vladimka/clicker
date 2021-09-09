let initialSave = {
    balance : 0,
    coinsPerClick : 1,
    coinsPerSecond : 0,
    timeSpeed : 1,
    upgrades : [
        {
            displayName : '+1 Палец',
            value : 0,
            cost : 30,
            costMultiplier : 1.17,
            bonusType : 'cpc',
            bonus : 1
        },
        {
            displayName : 'Авто Палец',
            value : 0,
            cost : 200,
            costMultiplier : 1.17,
            bonusType : 'cps',
            bonus : 1
        },
        {
            displayName : 'Авто Рука',
            value : 0,
            cost : 5e3,
            costMultiplier : 1.17,
            bonusType : 'cps',
            bonus : 10
        },
        {
            displayName : 'Скорость времени',
            value : 0,
            cost : 1e4,
            costMultiplier : 1.2,
            bonusType : 'ts',
            bonus : 1
        }
    ],
    prestigeUpgrades : [
        {
            displayName : 'Скорость времени',
            cost : 1,
            costMultiplier : 2,
            value : 0
        }
    ],
    achievements : [
        {
            name : 'Первая монета',
            has : false,
            description : 'Заработать первую монету'
        },
        {
            name : '30 пальцев',
            has : false,
            description : 'Купить десять улучшений "+1 палец"'
        },
        {
            name : '1000 монет',
            has : false,
            description : 'Заработать 1000 монет'
        },
        {
            name : 'Третья рука',
            has : false,
            description : 'Купить улучшение "Авто Рука"'
        }
    ],
    autosaveEnabled : true,
    autosaveInterval : 10,
    prestigePoints : 0,
    totalPrestiged : 0,
    timeSpeedBuyed : false
}

let achievementConditions = [
    () => user.balance >= 1,
    () => user.upgrades[0].value >= 10,
    () => user.balance >= 1000,
    () => user.upgrades[2].value >= 1
]

let user = initialSave;

function save(){
    localStorage.setItem('clicker-save', JSON.stringify(user));
}

function load(){
    let save = JSON.parse(localStorage.getItem('clicker-save'));

    if(save == undefined || save == null || save == {})
        return;

    for(let property in initialSave){
        if(save[property]) continue;

        save[property] = initialSave[property];
    }

    for(let i = 0; i < initialSave.upgrades.length; i++){
        let upg = initialSave.upgrades[i];

        if(!save.upgrades[i]){
            save.upgrades[i] = upg;
            continue;
        }

        if(save.upgrades[i].name == upg.name) continue;
        if(save.upgrades[i].cost != upg.cost){
            save.upgrades[i].cost = upg.cost;
            continue;
        }

        save.upgrades[i] = upg;
    }

    for(let i = 0; i < initialSave.prestigeUpgrades.length; i++){
        let upg = initialSave.prestigeUpgrades[i];

        if(!save.prestigeUpgrades[i]){
            save.prestigeUpgrades[i] = upg;
            continue;
        }

        if(save.prestigeUpgrades[i].name == upg.name) continue;
        if(save.prestigeUpgrades[i].cost != upg.cost){
            save.prestigeUpgrades[i].cost = upg.cost;
            continue;
        }

        save.prestigeUpgrades[i] = upg;
    }

    for(let i = 0; i < initialSave.achievements.length; i++){
        let achv = initialSave.achievements[i];

        if(!save.achievements[i]){
            save.achievements[i] = achv;
            continue;
        }

        if(save.achievements[i].name == achv.name) continue;

        save.achievements[i] = achv;
    }

    user = save;
}

function toggleAutosave(){
    user.autosaveEnabled = !user.autosaveEnabled;
}

function setAutosaveInterval(el){
    user.autosaveInterval = parseInt(el.value);
}

function hardReset(){
    user = initialSave;
    save();
    location.reload();
}

function autosaveTimeout(){
    if(user.autosaveEnabled){
        save();
        NotificationManager.add('Сохранено!');
    }
    
    setTimeout(autosaveTimeout, user.autosaveInterval * 1e3);
}