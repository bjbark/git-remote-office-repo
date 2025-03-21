Ext.define('module.stock.isos.mtrlmonthlist.store.MtrlMonthList', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.mtrlmonthlist.model.MtrlMonthList',
	autoLoad: false,
	remoteSort	: false,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/isos/mtrlmonthlist/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});