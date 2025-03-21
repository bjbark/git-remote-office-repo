Ext.define('module.sale.order.slorlist6.store.SlorList6Master', { extend:'Axt.data.Store',
	model: 'module.sale.order.slorlist6.model.SlorList6Master',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/slorlist6/get/search.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
