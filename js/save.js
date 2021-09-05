let initialSave = {
    balance : 0,
    coinsPerClick : 1,
    coinsPerSecond : 0,
    upgrades : [
        {
            displayName : '+1 палец',
            value : 0,
            cost : 30,
            costMultiplier : 1.17,
            bonusType : 'cpc',
            bonus : 1
        },
        {
            displayName : 'авто палец',
            value : 0,
            cost : 200,
            costMultiplier : 1.17,
            bonusType : 'cps',
            bonus : 1
        },
        {
            displayName : '+1 рука',
            value : 0,
            cost : 1e4,
            costMultiplier : 1.17,
            bonusType : 'cpc',
            bonus : 10
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
        }
    ],
    autosaveEnabled : true,
    autosaveInterval : 10,
    prestigePoints : 0
}

let achievementConditions = [
    () => user.balance >= 1,
    () => user.upgrades[0] >= 10,
    () => user.balance >= 1000
]

let user = initialSave;

function save(){
    localStorage.setItem('clicker-save', JSON.stringify(user));
    NotificationManager.add('Сохранено!');
}

function load(){
    let save = JSON.parse(localStorage.getItem('clicker-save'));

    if(save == undefined || save == null || save == {})
        return;

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
    if(user.autosaveEnabled)
        save();
    
    setTimeout(autosaveTimeout, user.autosaveInterval * 1e3);
}