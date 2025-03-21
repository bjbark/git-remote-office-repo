Ext.define('module.basic.delylcalmast.store.DelyLcalMast', { extend:'Axt.data.Store',
	model : 'module.basic.delylcalmast.model.DelyLcalMast',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/basic/delylcalmast/get/search.do",
			update	: _global.location.http() + "/basic/delylcalmast/set/record.do"
		},
		actionMethods: {
			read	: 'POST', update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});