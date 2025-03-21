Ext.define('module.mtrl.istt.isttsumlist.store.IsttSumListMaster', { extend:'Axt.data.Store',
	model	: 'module.mtrl.istt.isttsumlist.model.IsttSumListMaster',
	pageSize: 100,
	proxy	: {
		api	: {
			read  : _global.api_host_info + "/system/mtrl/istt/isttsumlist/get/master.do",
//			update: _global.api_host_info + "/system/mtrl/istt/isttsumlist/set/invoice.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});