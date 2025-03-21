Ext.define('module.custom.sjflv.mtrl.imp.reportmast.store.ReportMastListerMaster', { extend:'Axt.data.Store',
	model    : 'module.custom.sjflv.mtrl.imp.reportmast.model.ReportMastListerMaster',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/get/search.do",
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

