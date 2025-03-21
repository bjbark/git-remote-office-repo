Ext.define('module.user.userauth.store.UserAuthDetail', {extend:'Axt.data.TreeStore',// {extend:'Axt.data.Store',
	model   :'module.user.userauth.model.UserAuthDetail',
	autoLoad: false,
	root    : { expanded: false },
	/*
		속도문제 때문에 server sync후 client의 model을
		commit해서 dirty를 초기화 하지않고 그리드를 refresh 하기 위해
	*/
	mergedSyncModelCommit : false,
//	pageSize: 20, //,remoteSort:true
	proxy :{
		api :{
			read   : _global.api_host_info + "/system/user/userauth/get/detail.do",
			update : _global.api_host_info + "/system/user/userauth/set/detail.do"
		},
		actionMethods: {read: 'POST', update : 'POST'},
		extraParams:{ token : _global.token_id }
	}
});