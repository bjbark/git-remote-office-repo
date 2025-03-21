Ext.define('module.qc.insp.inspreport.store.InspReportLister2', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspreport.model.InspReportLister2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspreport/get/list2.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
