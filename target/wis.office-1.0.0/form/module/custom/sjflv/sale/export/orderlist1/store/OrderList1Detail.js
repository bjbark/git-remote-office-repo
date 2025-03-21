Ext.define('module.custom.sjflv.sale.export.orderlist1.store.OrderList1Detail', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.orderlist1.model.OrderList1Detail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom.sjflv.sale.export.orderlist1/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
