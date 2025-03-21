Ext.define('module.qc.insp.inspentry52.store.InspTypeItemPopup', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry52.model.InspTypeItemPopup',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry52/get/insp_cond.do",
			update	: _global.location.http() + "/qc/insp/inspentry52/set/listerpopup.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
