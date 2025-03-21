Ext.define('module.user.usermast.store.UserMast', { extend:'Axt.data.Store',
	model      : 'module.user.usermast.model.UserMast',
	autoLoad   : false,
	pageSize   : Const.SELECT.rows,
	remoteSort : true,
	proxy      : {
		api : {
			read	: _global.api_host_info + "/system/user/usermast/get/search.do",
			update	: _global.api_host_info + "/system/user/usermast/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});