Ext.define('module.custom.komec.qc.insp.inspentry3.store.InspTypeItemPopup', { extend:'Axt.data.Store',
	model: 'module.custom.komec.qc.insp.inspentry3.model.InspTypeItemPopup',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/komec/qc/insp/inspentry3/get/insp_cond.do",
			update	: _global.location.http() + "/custom/komec/qc/insp/inspentry3/set/listerpopup.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
