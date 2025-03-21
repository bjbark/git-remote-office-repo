Ext.define('module.prod.project.prjtotodwork.store.PrjtOtodWorkMaster', { extend:'Axt.data.Store',
	model: 'module.prod.project.prjtotodwork.model.PrjtOtodWorkMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/project/prjtotodwork/get/search.do",
			update: _global.api_host_info + "/system/prod/project/prjtotodwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
