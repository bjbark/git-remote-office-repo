Ext.define('module.custom.inkopack.cost.stndcostwork.model.StndCostWork',{ extend:'Axt.data.Model',
	fields:[
	        {name: 'line_seqn'		, type: 'int'     , defaultValue : 1 }, // 순번
			{name: 'cost_type_bacd'	, type: 'string' }, // 원가타입 분류코드
			{name: 'cost_type_name'	, type: 'string' }, // 원가타입 분류이름
			{name: 'mtrl_idcd'		, type: 'string' }, // 자재id
			{name: 'mtrl_spec'		, type: 'string' }, // 자재규격
			{name: 'mtrl_item_name'	, type: 'string' }, // 자재품명
			{name: 'item_tick'		, type: 'float'  }, // 품목두께
			{name: 'item_widh'		, type: 'float'  }, // 품목폭
			{name: 'need_qntt'		, type: 'float'  }, // 소요수량
			{name: 'item_leng'		, type: 'float'  }, // 품목길이
			{name: 'item_spgr'		, type: 'float'  }, // 품목비중
			{name: 'prnt_ccnt'		, type: 'float'  }, // 인쇄도수
			{name: 'stnd_pric'		, type: 'float'  }, // 표준단가
			{name: 'cost_larg_bacd'	, type: 'string' }, // 원가대분류코드
			{name: 'cost_larg_name'	, type: 'string' }, // 원가대분류이름
			{name: 'cost_midl_bacd'	, type: 'string' }, // 원가중분류코드
			{name: 'cost_midl_name'	, type: 'string' }, // 원가중분류이름
			{name: 'find_name'		, type: 'string' },
			{name: 'user_memo'		, type: 'string' },
			{name: 'prnt_idcd'		, type: 'string' },
			{name: 'cost_adpt_dvcd'	, type: 'string'  , defaultValue: 1  }, // 원가적용구분코드
			{name: 'line_stat'		, type: 'string'  , defaultValue:'0' },
			{name: 'line_levl'		, type: 'string'  , defaultValue:'4' }
		]
});
