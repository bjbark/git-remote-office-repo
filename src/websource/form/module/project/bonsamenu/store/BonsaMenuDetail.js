Ext.define('module.project.bonsamenu.store.BonsaMenuDetail', {  extend: 'Axt.data.TreeStore',
	model:'module.project.bonsamenu.model.BonsaMenuDetail',
	autoLoad: false,
	root: { expanded: false },
	proxy:{
	    api:{
	    	read   : _global.location.http()   + "/project/bonsamenu/get/detail.do",
	        update : _global.location.http()   + "/project/bonsamenu/set/detail.do"

	    },
	    actionMethods: {read: 'POST', update : 'POST'},
	    extraParams:{ token : _global.token_id }
	}
});