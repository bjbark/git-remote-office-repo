Ext.define('module.custom.iypkg.mtrl.po.purcordr.store.PurcOrdrLister2', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.mtrl.po.purcordr.model.PurcOrdrLister2',
	pageSize	: 100,
	remoteSort	: false,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/mtrl/po/purcordr/get/search2.do",
		},
		actionMethods	: {
			read	: 'POST',
			update	: 'POST'
		},
		extraParams	:{
			token	: _global.token_id
		}
	}
});

