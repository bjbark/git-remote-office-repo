Ext.define('module.custom.komec.prod.workbook.model.WorkBookBomPopup',{ extend:'Axt.data.Model',
	fields: [
		 {name: 'invc_numb'			, type: 'string'  , defaultValue : _global.hq_id }
		,{name: 'line_seqn'			, type: 'float'  }
		,{name: 'ivst_item_idcd'	, type: 'string'  }
		,{name: 'acct_name'			, type: 'string'  }
		,{name: 'item_code'			, type: 'string'  }
		,{name: 'item_name'			, type: 'string'  }
		,{name: 'item_spec'			, type: 'string'  }
		,{name: 'mixx_rate'			, type: 'string'  }
		,{name: 'ofap_mixx_rate'	, type: 'float'  }
		,{name: 'line_stat'			, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }
		,{name: 'user_memo'			, type: 'string'  }
	]
});
