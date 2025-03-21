Ext.define('module.custom.aone.prod.order.sorderworkreport.store.SorderWorkReportFile', { extend:'Axt.data.Store',
	model: 'module.custom.aone.prod.order.sorderworkreport.model.SorderWorkReportFile',
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
