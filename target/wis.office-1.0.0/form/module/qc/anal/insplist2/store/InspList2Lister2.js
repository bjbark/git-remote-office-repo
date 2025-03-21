Ext.define('module.qc.anal.insplist2.store.InspList2Lister2', { extend:'Axt.data.Store',
	model: 'module.qc.anal.insplist2.model.InspList2Lister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/qc/anal/insplist2/get/lister2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
