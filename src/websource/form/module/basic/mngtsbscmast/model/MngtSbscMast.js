Ext.define('module.basic.mngtsbscmast.model.MngtSbscMast',{ extend:'Axt.data.Model',
	fields:[
		{name: 'mngt_sbsc_dvcd'		, type: 'string'  },
		{name: 'mngt_sbsc_idcd'		, type: 'string'  },
		{name: 'mngt_sbsc_code'		, type: 'string'  },
		{name: 'mngt_sbsc_name'		, type: 'string'  },
		{name: 'prnt_idcd'			, type: 'string'  },
		{name: 'line_levl'			, type: 'string'  , defaultValue:'1'},
		{name: 'line_stat'			, type: 'string'  , defaultValue:'0'},
		{name: 'user_memo'			, type: 'string'  }
	]
});
