Ext.define('module.mtrl.isttcalc.purcpaywork.store.PurcPayWorkWorkerLister', { extend:'Axt.data.Store',
	model: 'module.mtrl.isttcalc.purcpaywork.model.PurcPayWorkWorkerLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/mtrl/isttcalc/purcpaywork/get/search3.do",
			update: _global.api_host_info + "/system/mtrl/isttcalc/purcpaywork/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
