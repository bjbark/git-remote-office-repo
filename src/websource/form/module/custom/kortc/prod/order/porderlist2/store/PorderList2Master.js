Ext.define('module.custom.kortc.prod.order.porderlist2.store.PorderList2Master', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.order.porderlist2.model.PorderList2Master',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/kortc/prod/order/porderlist2/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
