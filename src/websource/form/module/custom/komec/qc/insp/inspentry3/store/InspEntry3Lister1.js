Ext.define('module.custom.komec.qc.insp.inspentry3.store.InspEntry3Lister1', { extend:'Axt.data.Store',
	model: 'module.custom.komec.qc.insp.inspentry3.model.InspEntry3Lister1',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/komec/qc/insp/inspentry3/get/list1.do",
			update	: _global.location.http() + "/custom/komec/qc/insp/inspentry3/set/list1.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
