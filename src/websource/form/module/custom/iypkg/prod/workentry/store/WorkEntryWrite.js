Ext.define('module.custom.iypkg.prod.workentry.store.WorkEntryWrite', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workentry.model.WorkEntryWrite',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/workentry/get/write.do",
			update: _global.api_host_info + "/system/custom/iypkg/prod/workentry/set/write.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' , max : 'POST'},
		extraParams:{
			token : _global.token_id
		}
	}
});