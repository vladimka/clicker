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
				name : 'Worker',
				bonus : 1,
				type : 'ips',
				cost : 50
			},
			{
				name : 'Sysadmin',
				bonus : 1,
				type : 'ipc',
				cost : 100
			}
		]
	}
}

doLoad();