Ext.define('module.qc.insp.inspentry2.store.InspEntry2Master', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry2.model.InspEntry2Master',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry2/get/search.do",
			update	: _global.location.http() + "/qc/insp/inspentry2/set/list1.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
