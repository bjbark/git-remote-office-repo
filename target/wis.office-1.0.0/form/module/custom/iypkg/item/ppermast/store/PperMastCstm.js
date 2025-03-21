Ext.define('module.custom.iypkg.item.ppermast.store.PperMastCstm', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.item.ppermast.model.PperMastCstm',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/item/ppermast/get/cstm.do",
			update	: _global.api_host_info + "/system/custom/iypkg/item/ppermast/set/cstm.do"
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

