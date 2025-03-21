Ext.define('module.prod.project.prjtotodwork.store.PrjtOtodWorkDetail', { extend:'Axt.data.Store',
	model: 'module.prod.project.prjtotodwork.model.PrjtOtodWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/prod/project/prjtotodwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
