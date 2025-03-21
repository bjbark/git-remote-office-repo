Ext.define('module.custom.aone.sale.order.sordercofm.store.SorderCofmFile', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sordercofm.model.SorderCofmFile',
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
