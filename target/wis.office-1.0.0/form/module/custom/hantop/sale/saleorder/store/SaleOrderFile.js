Ext.define('module.custom.hantop.sale.saleorder.store.SaleOrderFile', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.saleorder.model.SaleOrderFile',
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
