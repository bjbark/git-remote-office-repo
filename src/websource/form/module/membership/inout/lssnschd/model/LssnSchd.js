Ext.define('module.membership.inout.lssnschd.model.LssnSchd', { extend:'Axt.data.Model',
	fields: [
		{	name: 'resv_time'		, type: 'string' },
		{	name: 'aa'				, type: 'string' },
		{	name: 'ab'				, type: 'string' },
		{	name: 'ac'				, type: 'string' },
		{	name: 'ad'				, type: 'string' },
		{	name: 'ae'				, type: 'string' },
		{	name: 'af'				, type: 'string' },
		{	name: 'ag'				, type: 'string' },
		{	name: 'ah'				, type: 'string' },
		{	name: 'ai'				, type: 'string' },
		{	name: 'aj'				, type: 'string' },
		{	name: 'ba'				, type: 'string' },
		{	name: 'bb'				, type: 'string' },
		{	name: 'bc'				, type: 'string' },
		{	name: 'bd'				, type: 'string' },
		{	name: 'be'				, type: 'string' },
		{	name: 'bf'				, type: 'string' },
		{	name: 'bg'				, type: 'string' },
		{	name: 'bh'				, type: 'string' },
		{	name: 'bi'				, type: 'string' },
		{	name: 'bj'				, type: 'string' },
		{	name: 'ca'				, type: 'string' },
		{	name: 'cb'				, type: 'string' },
		{	name: 'cc'				, type: 'string' },
		{	name: 'cd'				, type: 'string' },
		{	name: 'ce'				, type: 'string' },
		{	name: 'cf'				, type: 'string' },
		{	name: 'cg'				, type: 'string' },
		{	name: 'ch'				, type: 'string' },
		{	name: 'ci'				, type: 'string' },
		{	name: 'cj'				, type: 'string' },
		{	name: 'ck'				, type: 'string' },
		{	name: 'user_memo'		, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'		, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'		, type: 'string' },		//부모ID
		{	name: 'line_levl'		, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'		, type: 'string' },		//ROW순서
		{	name: 'line_stat'		, type: 'string'  , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'		, type: 'string' },		//ROW마감
		{	name: 'find_name'		, type: 'string' },		//찾기명
		{	name: 'updt_user_name'	, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'		, type: 'string' },		//수정IP
		{	name: 'updt_dttm'		, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'updt_idcd'		, type: 'string' },		//수정ID
		{	name: 'updt_urif'		, type: 'string' },		//수정UI
		{	name: 'crte_user_name'	, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'		, type: 'string' },		//생성IP
		{	name: 'crte_dttm'		, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//생성일시
		{	name: 'crte_idcd'		, type: 'string' },		//생성ID
		{	name: 'crte_urif'		, type: 'string' },		//생성UI
	]
});

