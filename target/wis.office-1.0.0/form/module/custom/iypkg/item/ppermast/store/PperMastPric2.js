Ext.define('module.custom.iypkg.item.ppermast.store.PperMastPric2', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.item.ppermast.model.PperMastPric',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/item/ppermast/get/pric.do",
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

