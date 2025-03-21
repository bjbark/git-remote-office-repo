Ext.define('module.qc.insp.inspentry6.store.InspEntry6Lister1', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry6.model.InspEntry6Lister1',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry6/get/lister1.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
