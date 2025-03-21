Ext.define('module.prod.project.prjtworkentry.store.PrjtWorkEntryDetail', { extend:'Axt.data.Store',
	model: 'module.prod.project.prjtworkentry.model.PrjtWorkEntryDetail',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/project/prjtworkentry/get/searchDetail.do",
			update	: _global.location.http() + "/prod/project/prjtworkentry/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
