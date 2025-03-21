Ext.define('module.qc.anal.insplist2.store.InspList2Lister', { extend:'Axt.data.Store',
	model: 'module.qc.anal.insplist2.model.InspList2Lister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read :  _global.api_host_info + "/system/qc/anal/insplist2/get/search.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
