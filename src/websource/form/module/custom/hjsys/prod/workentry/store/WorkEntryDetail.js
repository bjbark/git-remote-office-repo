Ext.define('module.custom.hjsys.prod.workentry.store.WorkEntryDetail', { extend:'Axt.data.Store',
	model: 'module.custom.hjsys.prod.workentry.model.WorkEntryDetail',
	autoLoad  : true,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/hjsys/prod/workentry/get/pror.do",
			update : _global.api_host_info + "/system/custom/hjsys/prod/workentry/set/setWorkBook.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
