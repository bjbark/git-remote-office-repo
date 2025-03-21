Ext.define('module.workshop.print.basic.mmbrmast.store.MmbrMast', { extend:'Axt.data.Store',
	model: 'module.workshop.print.basic.mmbrmast.model.MmbrMast',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http() + "/workshop/print/basic/mmbrmast/get/search.do",
			update : _global.location.http() + "/workshop/print/basic/mmbrmast/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
