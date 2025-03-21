Ext.define('module.custom.inkopack.prod.workentry.store.WorkEntryDetail4', { extend:'Axt.data.Store',
	model: 'module.custom.inkopack.prod.workentry.model.WorkEntryDetail4',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read   : _global.location.http() + "/custom/incopack/prod/workentry/get/searchDetail4.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
