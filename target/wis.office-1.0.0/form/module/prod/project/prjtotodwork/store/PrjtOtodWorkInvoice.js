Ext.define('module.prod.project.prjtotodwork.store.PrjtOtodWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.prod.project.prjtotodwork.model.PrjtOtodWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/project/prjtotodwork/get/invoice.do",
			update: _global.api_host_info + "/system/prod/project/prjtotodwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
