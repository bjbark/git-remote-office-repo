Ext.define('module.custom.kortc.sale.order.sordermast.store.SorderMastDetail4', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.sale.order.sordermast.model.SorderMastDetail4',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/kortc/sale/order/sordermast/get/detail4.do"
			,update : _global.location.http() +"/custom/kortc/sale/order/sordermast/set/detail4.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
