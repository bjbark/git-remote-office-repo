Ext.define('module.custom.komec.item.bomlist.store.BomListExcel', { extend:'Axt.data.Store',

	model: 'module.custom.komec.item.bomlist.model.BomListExcel',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
		},
		actionMethods: {
			read	: 'POST' ,
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});