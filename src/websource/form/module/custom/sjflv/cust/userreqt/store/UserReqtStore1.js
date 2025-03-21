Ext.define('module.custom.sjflv.cust.userreqt.store.UserReqtStore1', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.cust.userreqt.model.UserReqtModel1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/cust/userreqt/get/userreqt.do",
		},
		actionMethods: {
			read	: 'POST' ,
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
