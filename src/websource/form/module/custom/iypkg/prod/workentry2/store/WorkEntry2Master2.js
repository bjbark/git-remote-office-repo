Ext.define('module.custom.iypkg.prod.workentry2.store.WorkEntry2Master2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workentry2.model.WorkEntry2Master2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.location.http() + "/custom/iypkg/prod/workentry2/get/master2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});