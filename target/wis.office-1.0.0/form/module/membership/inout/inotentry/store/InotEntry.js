Ext.define('module.membership.inout.inotentry.store.InotEntry', { extend:'Axt.data.Store',
	model: 'module.membership.inout.inotentry.model.InotEntry',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/memberentry/get/inot.do",
			update : _global.api_host_info + "/system/membership/memberentry/set/inot2.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
