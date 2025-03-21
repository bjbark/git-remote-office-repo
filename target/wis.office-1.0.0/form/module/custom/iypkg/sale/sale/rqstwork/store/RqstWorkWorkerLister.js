Ext.define('module.custom.iypkg.sale.sale.rqstwork.store.RqstWorkWorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.sale.rqstwork.model.RqstWorkWorkerLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/sale/rqstwork/get/search3.do",
			update: _global.api_host_info + "/system/custom/iypkg/sale/sale/rqstwork/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
