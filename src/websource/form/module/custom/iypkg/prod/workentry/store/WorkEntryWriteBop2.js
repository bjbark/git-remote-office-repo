Ext.define('module.custom.iypkg.prod.workentry.store.WorkEntryWriteBop2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workentry.model.WorkEntryWriteBop',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/workentry/get/writebop2.do",
			update: _global.api_host_info + "/system/custom/iypkg/prod/workentry/set/write2.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});