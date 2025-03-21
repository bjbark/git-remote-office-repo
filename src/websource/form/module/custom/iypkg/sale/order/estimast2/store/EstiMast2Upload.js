Ext.define('module.custom.iypkg.sale.order.estimast2.store.EstiMast2Upload', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Upload',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/order/estimast2/get/search.do",
			update: _global.api_host_info + "/system/custom/iypkg/sale/order/estimast2/excel.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
