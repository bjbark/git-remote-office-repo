Ext.define('module.custom.iypkg.stock.isos.sptsmast.store.SptsMastLister', { extend:'Axt.data.Store',
	 model: 'module.custom.iypkg.stock.isos.sptsmast.model.SptsMast',
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.location.http() + "/custom/iypkg/stock/isos/sptsmast/get/search2.do",
			update : _global.location.http() + "/custom/iypkg/stock/isos/sptsmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});