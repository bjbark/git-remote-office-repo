Ext.define('module.custom.iypkg.sale.order.estimast1.store.EstiMast1File', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.order.estimast1.model.EstiMast1File',
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
