Ext.define('module.qc.insp.inspentry4.store.InspEntry4Master', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry4.model.InspEntry4Master',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry4/get/searchspts.do",
			update	: _global.location.http() + "/qc/insp/inspentry/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
