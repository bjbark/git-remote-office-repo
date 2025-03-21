Ext.define('module.custom.sjflv.sale.export.costmanagement.store.CostManagementInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.costmanagement.model.CostManagementInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
//			read  : _global.api_host_info + "/system/.custom.sjflv.sale.export.costmanagement/get/invoice.do",
//			update: _global.api_host_info + "/system/.custom.sjflv.sale.export.costmanagement/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
