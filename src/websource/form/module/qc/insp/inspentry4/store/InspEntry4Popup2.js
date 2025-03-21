Ext.define('module.qc.insp.inspentry4.store.InspEntry4Popup2', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry4.model.InspEntry4Popup2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/insp/inspentry4/get/inspcond.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
