Ext.define('com.common.option.store.TotalReqWorkOption', { extend:'Ext.data.Store',
	model: 'com.common.option.model.TotalReqWorkOption',
	autoLoad: false,
	pageSize: 20,
	proxy:{
		type : 'localstorage',
		id : 'TotalReqWorkOption'
	}
});
