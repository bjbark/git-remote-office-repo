Ext.define('module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Cost', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2Cost',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/get/cost.do",
			update : _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/set/cost.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
