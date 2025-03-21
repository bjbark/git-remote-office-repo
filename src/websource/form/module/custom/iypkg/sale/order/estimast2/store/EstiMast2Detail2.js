Ext.define('module.custom.iypkg.sale.order.estimast2.store.EstiMast2Detail2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Detail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/iypkg/sale/order/estimast2/get/detail2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
