Ext.define('module.project.certmast.store.CertMast', { extend:'Axt.data.Store',
	model: 'module.project.certmast.model.CertMast',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http()  + "/project/certmast/get/search.do"
		   ,update : _global.location.http()  + "/project/certmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});