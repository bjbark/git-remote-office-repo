Ext.define('module.item.colormix.store.ColorMixItem', { extend:'Axt.data.Store',
	model		: 'module.item.colormix.model.ColorMixItem',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/item/colormix/get/item.do",
			update	: _global.api_host_info + "/system/item/colormix/set/item.do"
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

