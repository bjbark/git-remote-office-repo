Ext.define('module.custom.sjflv.mtrl.imp.estimast.EstiMastUpload', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.estimast.EstiMastUpload',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/estimast/get/search.do",
			update: _global.api_host_info + "/system/sale/order/estimast/excel.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
