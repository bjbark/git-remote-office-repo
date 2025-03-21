Ext.define('module.custom.iypkg.sale.sale.dailysalelist.store.DailySaleList', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.sale.dailysalelist.model.DailySaleList',
	autoLoad: false,
	pageSize: 9999999,
	remoteSort	: true,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/iypkg/sale/sale/dailysalelist/get/search2.do"
		},
		actionMethods: { read: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});