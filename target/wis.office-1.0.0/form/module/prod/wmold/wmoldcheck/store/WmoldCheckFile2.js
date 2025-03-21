Ext.define('module.prod.wmold.wmoldcheck.store.WmoldCheckFile2', { extend:'Axt.data.Store',
	model: 'module.prod.wmold.wmoldcheck.model.WmoldCheckFile2',
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
