Ext.define('module.basic.basemast.model.BaseMast',{ extend:'Axt.data.Model',
	fields:[
		{name: 'hqof_idcd'		, type: 'string'  , defaultValue : _global.hq_id},
		{name: 'base_idcd'		, type: 'string'  },
		{name: 'base_code'		, type: 'string'  },
		{name: 'base_name'		, type: 'string'  },
		{name: 'base_engl_name'	, type: 'string'  },
		{name: 'refn_valu_1fst'	, type: 'string'  , defaultValue: 0},
		{name: 'prnt_idcd'		, type: 'string'  },
		{name: 'line_levl'		, type: 'string'  , defaultValue:'4'},
		{name: 'line_stat'		, type: 'string'  , defaultValue:'0'},
		{name: 'user_memo'		, type: 'string'  }
	]
});
