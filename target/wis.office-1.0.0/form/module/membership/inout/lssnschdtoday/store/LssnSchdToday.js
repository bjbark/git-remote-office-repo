Ext.define('module.membership.inout.lssnschdtoday.store.LssnSchdToday', { extend:'Axt.data.Store',
	model: 'module.membership.inout.lssnschdtoday.model.LssnSchdToday',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/lssnschdtoday/get/search.do",
			update : _global.api_host_info + "/system/membership/lssnschdtoday/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
