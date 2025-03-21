Ext.define('module.qc.insp.inspentry5.store.InspEntry5Master', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry5.model.InspEntry5Master',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry5/get/searchspts.do",
			update	: _global.location.http() + "/qc/insp/inspentry/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
