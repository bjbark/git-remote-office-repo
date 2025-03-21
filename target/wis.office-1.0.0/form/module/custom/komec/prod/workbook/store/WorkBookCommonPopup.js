Ext.define('module.custom.komec.prod.workbook.store.WorkBookCommonPopup', { extend:'Axt.data.Store',
	model: 'module.custom.komec.prod.workbook.model.WorkBookCommonPopup',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			update	: _global.location.http() + "/custom/komec/prod/workbook/set/setMaster.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
