Ext.define('module.custom.iypkg.eis.eisreport.store.EisReportPopup', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.eis.eisreport.model.EisReportPopup',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport/get/search2.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
