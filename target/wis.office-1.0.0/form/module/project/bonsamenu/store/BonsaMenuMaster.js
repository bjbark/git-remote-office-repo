Ext.define('module.project.bonsamenu.store.BonsaMenuMaster', {extend:'Axt.data.Store',
	model:'module.project.bonsamenu.model.BonsaMenuMaster',
	autoLoad: false,
	pageSize: 20,
	proxy:{
	   api:{
		   read  : _global.location.http()  + "/project/bonsamenu/get/search.do"
	   },
	   actionMethods: { read: 'POST'},
	   extraParams:{ token : _global.token_id}
	}
});
