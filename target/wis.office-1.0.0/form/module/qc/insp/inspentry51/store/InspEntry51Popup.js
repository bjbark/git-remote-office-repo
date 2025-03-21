Ext.define('module.qc.insp.inspentry51.store.InspEntry51Popup', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry51.model.InspEntry51Popup',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry51/get/popup.do",
			update	: _global.location.http() + "/qc/insp/inspentry51/set/popup.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
