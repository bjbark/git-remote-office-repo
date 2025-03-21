Ext.define('module.custom.sjflv.sale.export.report.store.ReportFile', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.report.model.ReportFile',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/upload/get/filesearch.do",
			update : _global.api_host_info + "/system/upload/get/fileUpload.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
