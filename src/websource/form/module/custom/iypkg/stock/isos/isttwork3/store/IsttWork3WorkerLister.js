Ext.define('module.custom.iypkg.stock.isos.isttwork3.store.IsttWork3WorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.isttwork3.model.IsttWork3WorkerLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork3/get/search3.do",
			update: _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork3/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
