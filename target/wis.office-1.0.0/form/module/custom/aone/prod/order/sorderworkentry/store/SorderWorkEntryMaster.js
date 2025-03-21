Ext.define('module.custom.aone.prod.order.sorderworkentry.store.SorderWorkEntryMaster', { extend:'Axt.data.Store',
	model: 'module.custom.aone.prod.order.sorderworkentry.model.SorderWorkEntryMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/prod/order/sorderworkentry/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
