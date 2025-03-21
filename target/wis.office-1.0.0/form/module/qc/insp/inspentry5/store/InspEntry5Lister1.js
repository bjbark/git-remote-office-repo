Ext.define('module.qc.insp.inspentry5.store.InspEntry5Lister1', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry5.model.InspEntry5Lister1',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry5/get/detail.do",
			update	: _global.location.http() + "/qc/insp/inspentry/set/list1.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
