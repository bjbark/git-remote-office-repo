Ext.define('module.custom.komec.qc.insp.inspentry3.store.InspEntry3Master', { extend:'Axt.data.Store',
	model: 'module.custom.komec.qc.insp.inspentry3.model.InspEntry3Master',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/komec/qc/insp/inspentry3/get/search.do",
			update	: _global.location.http() + "/custom/komec/qc/insp/inspentry3/set/list1.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
