Ext.define('module.prod.plan.plananallist.model.PlanAnalList2', { extend:'Axt.data.Model',
	fields : [
		{	name : 'hq_id'				, type : 'string'  , defaultValue : _global.hq_id
		},{ name: 'invc_numb'			, type: 'string'
		},{ name: 'line_seqn'			, type: 'float '
		},{ name: 'item_code'			, type: 'string'
		},{ name: 'item_name'			, type: 'string'
		},{ name: 'item_spec'			, type: 'string'
		},{ name: 'ordr_dvcd'			, type: 'string'
		},{ name: 'acpt_qntt'			, type: 'float'
		},{ name: 'stok_used_qntt'		, type: 'float'
		},{ name: 'indn_qntt'			, type: 'float'
		},{ name: 'pdod_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{ name: 'plan_strt_dttm'		, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr
		},{ name: 'plan_endd_dttm'		, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr
		},{ name: 'work_strt_dttm'		, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr
		},{ name: 'work_endd_dttm'		, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr
		},{ name: 'work_qntt'			, type: 'float'
		},{ name: 'dely_dcnt'			, type: 'string'
		},{ name: 'deli_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{ name: 'cstm_deli_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{ name: 'deli_chge_resn'		, type: 'string'
		},{ name: 'cstm_name'			, type: 'string'
		},{ name: 'drtr_name'			, type: 'string'
		},{ name: 'acpt_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'acpt_numb'			, type : 'string'
		},{	name : 'lott_numb'			, type : 'string'
		},{	name : 'user_memo'			, type : 'string'		//사용자메모
		},{	name : 'sysm_memo'			, type : 'string'		//시스템메모
		},{	name : 'prnt_idcd'			, type : 'string'		//부모ID
		},{	name : 'line_levl'			, type : 'float'  , defaultValue: '0'		//ROW레벨
		},{	name : 'line_ordr'			, type : 'string'		//ROW순서
		},{	name : 'line_stat'			, type : 'string' , defaultValue: '0'		//ROW상태
		},{	name : 'line_clos'			, type : 'string'		//ROW마감
		},{	name : 'find_name'			, type : 'string'		//찾기명
		},{	name : 'updt_user_name'		, type : 'string'		//수정사용자명
		},{	name : 'updt_ipad'			, type : 'string'		//수정IP
		},{	name : 'updt_dttm'			, type : 'string'		//수정일시
		},{	name : 'updt_idcd'			, type : 'string'		//수정ID
		},{	name : 'updt_urif'			, type : 'string'		//수정UI
		},{	name : 'crte_user_name'		, type : 'string'		//생성사용자명
		},{	name : 'crte_ipad'			, type : 'string'		//생성IP
		},{	name : 'crte_dttm'			, type : 'string'		//생성일시
		},{	name : 'crte_idcd'			, type : 'string'		//생성ID
		},{	name : 'crte_urif'			, type : 'string'		//생성UI
		}
	]
});
