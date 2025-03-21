Ext.define('module.custom.sjflv.sale.export.nego.store.NegoInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.nego.model.NegoInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/.custom.sjflv.sale.export.nego/get/invoice.do",
			update: _global.api_host_info + "/system/.custom.sjflv.sale.export.nego/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
