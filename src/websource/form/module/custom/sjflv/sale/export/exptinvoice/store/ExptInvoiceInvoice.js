Ext.define('module.custom.sjflv.sale.export.exptinvoice.store.ExptInvoiceInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.exptinvoice.model.ExptInvoiceInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/export/exptinvoice/get/invoice.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/export/exptinvoice/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
