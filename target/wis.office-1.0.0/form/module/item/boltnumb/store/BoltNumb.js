Ext.define('module.item.boltnumb.store.BoltNumb', { extend:'Axt.data.Store',
	model		: 'module.item.boltnumb.model.BoltNumb',
	autoLoad	: false,
	pageSize	: Const.SELECT.rows,
	remoteSort	: true,
	proxy		: {
		api : {
			read	: _global.api_host_info + "/system/item/boltnumb/get/search.do",
			update	: _global.api_host_info + "/system/item/boltnumb/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams  : { token : _global.token_id }
	}
});