let save = {}

function doSave(){
	localStorage.setItem('save', JSON.stringify(save));
}

function doLoad(){
	save = JSON.parse(localStorage.getItem('save')) || {
		balance : 0,
		ipc : 1,
		ips : 0,
		upgrades : [
			{
				name : 'Грузчик',
				bonus : 1,
				type : 'ips',
				cost : 50
			},
			{
				name : 'Менеджер',
				bonus : 1,
				type : 'ipc',
				cost : 100
			},
			{
				name : 'Джуниор Веб Разработчик',
				bonus : 5,
				type : 'ips',
				cost : 509
			},
			{
				name : 'Мидл Веб Разработчик',
				bonus : 5,
				type : 'ipc',
				cost : 1200
			}
		]
	}
}

doLoad();