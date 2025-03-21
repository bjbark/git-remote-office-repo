Ext.define('module.custom.sjflv.item.bomlist.store.BomListExcel', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.item.bomlist.model.BomListExcel',
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