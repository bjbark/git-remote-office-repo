Ext.define('module.qc.insp.inspentry5.store.InspEntry5Popup2', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry5.model.InspEntry5Popup2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry5/get/popup2.do",
			update	: _global.location.http() + "/qc/insp/inspentry5/set/inspPopup.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
