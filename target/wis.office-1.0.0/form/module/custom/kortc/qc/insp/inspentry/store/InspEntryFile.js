Ext.define('module.custom.kortc.qc.insp.inspentry.store.InspEntryFile', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.qc.insp.inspentry.model.InspEntryFile',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/upload/get/filesearch.do",
			 update : _global.api_host_info + "/system/custom/kortc/qc/insp/inspentry/set/fileUpload.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
