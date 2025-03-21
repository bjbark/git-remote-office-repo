Ext.define('module.project.bonsainfo.store.BonsaInfo', {
	extend:'Axt.data.Store',
	model: 'module.project.bonsainfo.model.BonsaInfo',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http()  + "/project/bonsainfo/get/search.do"
		   ,update : _global.location.http()  + "/project/bonsainfo/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});