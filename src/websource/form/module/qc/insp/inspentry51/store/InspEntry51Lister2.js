Ext.define('module.qc.insp.inspentry51.store.InspEntry51Lister2', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry51.model.InspEntry51Lister2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry51/get/lister2.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
