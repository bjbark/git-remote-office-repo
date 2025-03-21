Ext.define('module.custom.iypkg.mtrl.purc.npaysumlist.store.NpaySumList', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.mtrl.purc.npaysumlist.model.NpaySumList',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/mtrl/purc/npaysumlist/get/search.do",
		},
		actionMethods: {
			read	: 'POST',
			update	: 'POST'
		},
		extraParams:{
			token	: _global.token_id
		}
	}
});

