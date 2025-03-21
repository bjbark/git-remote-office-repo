Ext.define('module.custom.hantop.sale.estientry.store.EstiEntryInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.estientry.model.EstiEntryInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hntop/sale/estientry/get/invoice.do",
			update: _global.api_host_info + "/system/custom/hntop/sale/estientry/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
