Ext.define('module.custom.aone.prod.order.sorderworkentry.store.SorderWorkEntryFile', { extend:'Axt.data.Store',
	model: 'module.custom.aone.prod.order.sorderworkentry.model.SorderWorkEntryFile',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/upload/get/filesearch.do",
			update	: _global.api_host_info + "/system/upload/get/fileUpload.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
