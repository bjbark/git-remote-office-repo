Ext.define('module.custom.iypkg.stock.isos.isttwork1.store.IsttWork1WorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.isttwork1.model.IsttWork1WorkerLister',
	autoLoad: false,
	pageSize	: 99999,
	remoteSort	: false,
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
