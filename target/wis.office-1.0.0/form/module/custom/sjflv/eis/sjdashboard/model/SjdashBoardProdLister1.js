Ext.define('module.custom.sjflv.eis.sjdashboard.model.SjdashBoardProdLister1',{ extend:'Axt.data.Model',
	fields:[
		{name: 'item_code'			, type: 'string'  },
		{name: 'item_idcd'			, type: 'string'  },
		{name: 'item_name'			, type: 'string'  },
		{name: 'item_spec'			, type: 'string'  },
		{name: 'safe_stok'			, type: 'float '  , defaultValue: 0},
		{name: 'stok_qntt'			, type: 'float '  , defaultValue: 0},
		{name: 'invc_qntt'			, type: 'float '  , defaultValue: 0},
	]
});
