Ext.define('module.custom.kortc.prod.order.porderlist2.store.PorderList2Detail', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.order.porderlist2.model.PorderList2Detail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/kortc/prod/order/porderlist2/get/mans.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
