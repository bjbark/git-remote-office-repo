Ext.define('module.custom.sjflv.sale.export.offermast.store.OfferMastInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.offermast.model.OfferMastInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/export/offermast/get/invoice.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/export/offermast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});

