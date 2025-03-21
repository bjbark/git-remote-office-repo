Ext.define('module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Payment', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2Payment',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/get/payment.do",
			update : _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/set/payment.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
