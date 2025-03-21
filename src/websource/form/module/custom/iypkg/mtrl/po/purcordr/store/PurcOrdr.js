Ext.define('module.custom.iypkg.mtrl.po.purcordr.store.PurcOrdr', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.mtrl.po.purcordr.model.PurcOrdr',
	autoLoad: false,
	pageSize	: 99999,
	remoteSort	: false,
	proxy		: {
		api	: {
			read	: _global.api_host_info + "/system/custom/iypkg/mtrl/po/purcordr/get/search.do",
			update: _global.api_host_info + "/system/custom/iypkg/mtrl/po/purcordr/set/record2.do"
		},
		actionMethods: {
			read	: 'POST',
			update	: 'POST'
		},
		extraParams	:{
			token	: _global.token_id
		}
	}
});

