Ext.define('module.membership.inout.lssnschd.store.LssnSchd', { extend:'Axt.data.Store',
	model: 'module.membership.inout.lssnschd.model.LssnSchd',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/lssnschd/get/search.do",
			update : _global.api_host_info + "/system/membership/lssnschd/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
