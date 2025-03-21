Ext.define('module.sale.clam.clamentry1.store.ClamEntry1File', { extend:'Axt.data.Store',
	model: 'module.sale.clam.clamentry1.model.ClamEntry1File',
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
