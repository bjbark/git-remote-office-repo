Ext.define('module.qc.anal.insplist2.store.InspList2Lister4', { extend:'Axt.data.Store',
	model: 'module.qc.anal.insplist2.model.InspList2Lister4',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info  + "/system/qc/anal/insplist2/get/lister4.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
