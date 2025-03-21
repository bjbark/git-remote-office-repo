Ext.define('module.custom.sjflv.sale.export.orderlist1.store.OrderList1Master', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.orderlist1.model.OrderList1Master',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom.sjflv.sale.export.orderlist1/get/search.do",
			update: _global.api_host_info + "/system/custom.sjflv.sale.export.orderlist1/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
