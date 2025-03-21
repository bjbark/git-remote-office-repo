Ext.define('module.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerMaster2', { extend:'Axt.data.Store',
	model    : 'module.mtrl.isttcalc.purcpaywork.model.PurcPayWorkListerMaster',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/mtrl/isttcalc/purcpaywork/get/search2.do",
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

