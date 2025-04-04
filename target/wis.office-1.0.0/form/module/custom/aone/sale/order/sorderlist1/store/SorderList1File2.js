Ext.define('module.custom.aone.sale.order.sorderlist1.store.SorderList1File2', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sorderlist1.model.SorderList1File',
	autoLoad  : false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/upload/get/filesearch.do",
			update	: _global.api_host_info + "/system/upload/set/fileUpload.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});