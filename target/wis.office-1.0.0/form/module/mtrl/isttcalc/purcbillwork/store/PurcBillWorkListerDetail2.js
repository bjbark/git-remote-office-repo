Ext.define('module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkListerDetail2', { extend:'Axt.data.Store',
	model    : 'module.mtrl.isttcalc.purcbillwork.model.PurcBillWorkListerDetail',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/mtrl/isttcalc/purcbillwork/get/detail2.do",
		},
		actionMethods: {
			read   : 'POST',
			update : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

