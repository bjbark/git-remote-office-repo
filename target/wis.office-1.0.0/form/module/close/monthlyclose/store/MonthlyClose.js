Ext.define('module.close.monthlyclose.store.MonthlyClose', { extend:'Axt.data.Store',
	model: 'module.close.monthlyclose.model.MonthlyClose',
	autoLoad	: false,
	pageSize	: Const.SELECT.rows,
	remoteSort	: true,
	proxy		: {
		api		: {
		   read  : _global.api_host_info + "/system/close/monthlyclose/get/search.do",
		   update: _global.api_host_info + "/system/close/monthlyclose/set/record.do"
		},
		actionMethods: { read : 'POST' },
		extraParams	:{
			token 	: _global.token_id
		}
	}
});
