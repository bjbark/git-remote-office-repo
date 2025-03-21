Ext.define('module.custom.iypkg.eis.eisreport.store.EisReportPopup2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.eis.eisreport.model.EisReportPopup2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport/get/search3.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
