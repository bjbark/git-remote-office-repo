Ext.define('module.custom.sjflv.mtrl.isttcalc.npaysumlist.store.NpaySumListLister2', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.mtrl.isttcalc.npaysumlist.model.NpaySumListLister2',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/npaysumlist/get/search2.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});