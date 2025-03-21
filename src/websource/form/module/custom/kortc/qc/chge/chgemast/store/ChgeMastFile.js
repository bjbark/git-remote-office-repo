Ext.define('module.custom.kortc.qc.chge.chgemast.store.ChgeMastFile', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.qc.chge.chgemast.model.ChgeMastFile',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/custom/kortc/qc/chge/chgemast/get/filesearch.do",
			 update : _global.api_host_info + "/system/custom/kortc/qc/chge/chgemast/get/fileUpload.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
