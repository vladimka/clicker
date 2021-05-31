let balanceTx = document.getElementById('balance');
let ipsTx = document.getElementById('ips');
let ipcTx = document.getElementById('ipc');
let upgradesLi = document.querySelectorAll('.upgrade-buy');

function buyUpgrade(upgradeIndex){
	let upgrade = save.upgrades[upgradeIndex];

	if(save.balance < upgrade.cost)
		return;

	save.balance -= upgrade.cost;
	upgrade.cost *= 1.17;
	upgrade.type == 'ips' ? save.ips += upgrade.bonus : save.ipc += upgrade.bonus;
}

function work(){
	save.balance += save.ipc;
}

function update(){
	balanceTx.innerText = `Баланс: ${save.balance.toFixed(2)}$`;
	ipsTx.innerText = `Доход в секунду: ${save.ips.toFixed(2)}$`;
	ipcTx.innerText = `Доход за клик: ${save.ipc.toFixed(2)}$`;

	upgradesLi.forEach((upgrade, i) => upgrade.innerText = `${save.upgrades[i].name}: ${save.upgrades[i].cost.toFixed(2)}$`);
}

function balanceUpdate(){
	save.balance += save.ips;
}

setInterval(update, 100);
setInterval(balanceUpdate, 1000);
setInterval(() => doSave(), 10000);