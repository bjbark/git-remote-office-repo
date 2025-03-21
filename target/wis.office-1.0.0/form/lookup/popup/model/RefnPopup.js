Ext.define('lookup.popup.model.RefnPopup',{ extend:'Axt.data.Model',
	fields: [
		{name: 'refn_dvcd'		, type: 'string'  },
		{name: 'refn_code'		, type: 'string'  },
		{name: 'base_code'		, type: 'string'  },
		{name: 'refn_cont_1fst'	, type: 'string'  },
		{name: 'refn_cont_2snd'	, type: 'string'  },
		{name: 'refn_cont_3trd'	, type: 'string'  },
		{name: 'refn_cont_4frt'	, type: 'string'  },
		{name: 'refn_cont_5fit'	, type: 'string'  },

		{name: 'user_memo'		, type: 'string' },		//사용자메모
		{name: 'sysm_memo'		, type: 'string' },		//시스템메모
		{name: 'prnt_idcd'		, type: 'string' },		//부모ID
		{name: 'line_levl'		, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr'		, type: 'string' },		//ROW순서
		{name: 'line_stat'		, type: 'string'  , defaultValue: '0'},		//ROW상태
		{name: 'line_clos'		, type: 'string' },		//ROW마감
		{name: 'find_name'		, type: 'string' },		//찾기명
		{name: 'updt_ipad'		, type: 'string' },		//수정IP
		{name: 'updt_dttm'		, type: 'string' , defaultValue: Ext.Date.format(new Date(),'Ymd')},		//수정일시
		{name: 'updt_idcd'		, type: 'string'  , defaultValue:_global.login_pk },		//수정ID
		{name: 'updt_urif'		, type: 'string' },		//수정UI
		{name: 'crte_ipad'		, type: 'string' },		//생성IP
		{name: 'crte_dttm'		, type: 'string' , defaultValue: Ext.Date.format(new Date(),'Ymd')},		//생성일시
		{name: 'crte_idcd'		, type: 'string' , defaultValue:_global.login_pk},		//생성ID
		{name: 'crte_urif'		, type: 'string' },		//생성UI
	]
});
