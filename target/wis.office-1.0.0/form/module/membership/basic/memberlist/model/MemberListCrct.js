Ext.define('module.membership.basic.memberlist.model.MemberListCrct', { extend:'Axt.data.Model',
	fields: [
 		{	name: 'mmbr_idcd'		, type: 'string' },
		{	name: 'mmbr_name'		, type: 'string' },
		{	name: 'line_seqn'		, type: 'float' },
		{	name: 'acce_date'		, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{	name: 'annc_dvcd'		, type: 'string' },
		{	name: 'qntt'			, type: 'float' , defaultValue : 1},
		{	name: 'pric'			, type: 'float' , defaultValue : 0},
		{	name: 'amnt'			, type: 'float' , defaultValue : 0},
		{	name: 'lssn_stdt'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{	name: 'stot_dvcd'		, type: 'string' },
		{	name: 'acct_nmbr'		, type: 'string' },
		{	name: 'drtr_idcd'		, type: 'string' },
		{	name: 'drtr_name'		, type: 'string' },
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

