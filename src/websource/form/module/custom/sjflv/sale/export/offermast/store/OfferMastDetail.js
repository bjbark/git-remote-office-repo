Ext.define('module.custom.sjflv.sale.export.offermast.store.OfferMastDetail', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.offermast.model.OfferMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/sjflv/sale/export/offermast/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
