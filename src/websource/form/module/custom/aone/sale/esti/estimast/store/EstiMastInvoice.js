Ext.define('module.custom.aone.sale.esti.estimast.store.EstiMastInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.esti.estimast.model.EstiMastInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/sale/estimast/get/invoice.do",
			update: _global.api_host_info + "/system/custom/aone/sale/estimast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
