Ext.define('module.custom.komec.prod.workbook.store.WorkBookMainPopup', { extend:'Axt.data.Store',
	model: 'module.custom.komec.prod.workbook.model.WorkBookMainPopup',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/komec/prod/workbook/get/mainPopup.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
