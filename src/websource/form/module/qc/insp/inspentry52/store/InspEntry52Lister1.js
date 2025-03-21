Ext.define('module.qc.insp.inspentry52.store.InspEntry52Lister1', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry52.model.InspEntry52Lister1',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry52/get/detail.do",
			update	: _global.location.http() + "/qc/insp/inspentry/set/list1.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
