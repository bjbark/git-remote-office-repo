Ext.define('module.user.laborate.store.LaboRate', { extend:'Axt.data.Store',
	model		: 'module.user.laborate.model.LaboRate',
	autoLoad	: false,
	pageSize	: Const.SELECT.rows,
	remoteSort	: true,
	proxy		: {
		api : {
			read	: _global.api_host_info + "/system/user/laborate/get/search.do",
			update	: _global.api_host_info + "/system/user/laborate/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams  : { token : _global.token_id }
	}
});