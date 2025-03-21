Ext.define('module.custom.sjflv.sale.export.offermast.store.OfferMastMaster', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.offermast.model.OfferMastMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/export/offermast/get/search.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/export/offermast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
