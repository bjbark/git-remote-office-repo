Ext.define('module.custom.iypkg.sale.order.slorlist3.store.SlorList3Master3', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.sale.order.slorlist3.model.SlorList3Master',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/sale/order/slorlist3/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});