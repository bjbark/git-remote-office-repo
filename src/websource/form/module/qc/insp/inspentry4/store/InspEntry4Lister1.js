Ext.define('module.qc.insp.inspentry4.store.InspEntry4Lister1', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry4.model.InspEntry4Lister1',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry4/get/detail.do",
			update	: _global.location.http() + "/qc/insp/inspentry/set/list1.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
