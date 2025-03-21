Ext.define('module.custom.kortc.prod.order.porderlist.store.PorderListDetail', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.order.porderlist.model.PorderListDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/kortc/prod/order/porderlist/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
