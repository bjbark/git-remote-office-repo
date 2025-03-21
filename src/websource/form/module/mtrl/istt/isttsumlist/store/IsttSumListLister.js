Ext.define('module.mtrl.istt.isttsumlist.store.IsttSumListLister', { extend:'Axt.data.Store',
	model	: 'module.mtrl.istt.isttsumlist.model.IsttSumListLister',
	pageSize: 200,
	proxy	: {
		api	: {
			read  : _global.api_host_info + "/system/mtrl/istt/isttsumlist/get/lister.do",
//			update: _global.api_host_info + "/system/mtrl/istt/isttsumlist/set/invoice.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});