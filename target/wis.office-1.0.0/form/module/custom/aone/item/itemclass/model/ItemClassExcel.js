Ext.define('module.custom.aone.item.itemclass.model.ItemClassExcel', { extend:'Axt.data.Model',

	fields: [
		{ name: 'hq_id',           	type: 'string'  , defaultValue : _global.hq_id },
		{ name: 'stor_grp',           	type: 'string'  , defaultValue : _global.stor_grp },
		{ name: 'clss_id',           	type: 'string'  },
		{ name: 'clss_cd',           	type: 'string'  },
		{ name: 'clss_nm',       	    type: 'string'  },
		{ name: 'clss_desct',       	    type: 'string'  },
		{ name: 'class_lv',       	    type: 'string'  },
//        { name: 'class_no',         	type: 'integer'  , defaultValue:  0  },
//        { name: 'user_memo',         	type: 'string'  },
//        { name: 'prnt_id',         	type: 'string'   , defaultValue: '0' },
//        { name: 'row_lvl',         	type: 'integer'  , defaultValue:  1  },
//        { name: 'row_ord',         	type: 'integer'  , defaultValue:  1  },
		{ name: 'row_sts',         	type: 'string'   , defaultValue: '0' }
	]
});
