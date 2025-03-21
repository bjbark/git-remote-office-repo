Ext.define('module.custom.iypkg.prod.workentry2.store.WorkEntry2Detail2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workentry2.model.WorkEntry2Detail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read   : _global.location.http() + "/custom/iypkg/prod/workentry2/get/detail2.do",
			update : _global.location.http() + "/custom/iypkg/prod/workentry2/set/record.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});