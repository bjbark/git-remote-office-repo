Ext.define('module.custom.kortc.prod.order.porderlist2.store.PorderList2Detail3', { extend:'Axt.data.Store',
	model : 'module.custom.kortc.prod.order.porderlist2.model.PorderList2Detail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/kortc/prod/order/porderlist2/get/loss.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});