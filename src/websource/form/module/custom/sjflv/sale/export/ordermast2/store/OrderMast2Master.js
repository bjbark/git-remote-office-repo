Ext.define('module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Master', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2Master',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/get/search.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/set/invc.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
