Ext.define('module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkWorkerLister2', { extend:'Axt.data.Store',
	model: 'module.mtrl.isttcalc.purcbillwork.model.PurcBillWorkWorkerLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/get/search3.do",
			update: _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
