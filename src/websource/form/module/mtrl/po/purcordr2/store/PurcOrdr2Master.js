Ext.define('module.mtrl.po.purcordr2.store.PurcOrdr2Master', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.purcordr2.model.PurcOrdr2Master',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/mtrl/po/purcordr2/get/search.do",
			update: _global.api_host_info + "/system/mtrl/po/purcordr2/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
