Ext.define('module.custom.sjflv.sale.export.blmast.store.BlMastInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.blmast.model.BlMastInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/.custom.sjflv.sale.export.blmast/get/invoice.do",
			update: _global.api_host_info + "/system/.custom.sjflv.sale.export.blmast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
