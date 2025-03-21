Ext.define('module.membership.basic.memberlist.store.MemberListCrct', { extend:'Axt.data.Store',
	model: 'module.membership.basic.memberlist.model.MemberListCrct',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/memberentry/get/crct.do",
			update : _global.api_host_info + "/system/membership/memberentry/set/crct.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
