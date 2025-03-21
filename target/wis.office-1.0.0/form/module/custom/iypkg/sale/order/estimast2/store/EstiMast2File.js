Ext.define('module.custom.iypkg.sale.order.estimast2.store.EstiMast2File', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2File',
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
