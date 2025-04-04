Ext.define('lookup.popup.model.BasePopup',{ extend:'Axt.data.Model',
	fields: [
		 {name: 'hqof_idcd'			, type: 'string'  , defaultValue : _global.hq_id }
		,{name: 'base_idcd'			, type: 'string'  }
		,{name: 'base_code'			, type: 'string'  }
		,{name: 'base_name'			, type: 'string'  }
		,{name: 'base_engl_name'	, type: 'string'  }
		,{name: 'prnt_idcd'			, type: 'string'  }
		,{name: 'code_leng'			, type: 'string'  }
		,{name: 'refn_valu_1fst'	, type: 'float'   }
		,{name: 'line_levl'			, type: 'string'  , defaultValue:'5'}
		,{name: 'line_stat'			, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }
		,{name: 'user_memo'			, type: 'string'  }
		,{name: 'sysm_memo'			, type: 'string'  }
	]
});
