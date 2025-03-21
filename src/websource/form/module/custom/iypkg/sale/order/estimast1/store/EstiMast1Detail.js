Ext.define('module.custom.iypkg.sale.order.estimast1.store.EstiMast1Detail', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.order.estimast1.model.EstiMast1Detail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/iypkg/sale/order/estimast1/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
