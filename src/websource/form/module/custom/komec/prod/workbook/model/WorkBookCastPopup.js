Ext.define('module.custom.komec.prod.workbook.model.WorkBookCastPopup',{ extend:'Axt.data.Model',
	fields : [
		{	name : 'insp_type_idcd'		, type : 'string'
		},{	name : 'line_seqn'			, type : 'float'
		},{	name : 'invc_numb'			, type : 'string'
		},{	name : 'wkct_idcd'			, type : 'string'
		},{	name : 'invc_date'			, type : 'string'
		},{	name : 'insp_sbsc_name'		, type : 'string'
		},{	name : 'ctq_sbsc_yorn'		, type : 'string'
		},{	name : 'insp_cvic_idcd'		, type : 'string'
		},{	name : 'insp_mthd_dvcd'		, type : 'string'
		},{	name : 'insp_levl_uppt'		, type : 'string'
		},{	name : 'insp_levl_midl'		, type : 'string'
		},{	name : 'insp_levl_lprt'		, type : 'string'
		},{	name : 'insp_cond'			, type : 'string'
		},{	name : 'rslt_iput_dvcd'		, type : 'string'
		},{	name : 'msmt_mthd_dvcd'		, type : 'string'
		},{	name : 'insp_levl'			, type : 'string'
		},{	name : 'lott_judt_stnd'		, type : 'string'
		},{	name : 'goal_levl'			, type : 'string'
		},{	name : 'uppr_valu'			, type : 'string'
		},{	name : 'lwlt_valu'			, type : 'string'
		},{	name : 'remk_text'			, type : 'string'
		},{	name : 'frst_msmt'			, type : 'string'
		},{	name : 'frst_msmt_2hr'		, type : 'string'
		},{	name : 'send_msmt'			, type : 'string'
		},{	name : 'send_msmt_2hr'		, type : 'string'
		},{	name : 'thrd_msmt'			, type : 'string'
		},{	name : 'thrd_msmt_2hr'		, type : 'string'
		},{	name : 'frst_msmt_chk'		, type : 'string',defaultValue:'N'
		},{	name : 'frst_msmt_2hr_chk'	, type : 'string',defaultValue:'N'
		},{	name : 'send_msmt_chk'		, type : 'string',defaultValue:'N'
		},{	name : 'send_msmt_2hr_chk'	, type : 'string',defaultValue:'N'
		},{	name : 'thrd_msmt_chk'		, type : 'string',defaultValue:'N'
		},{	name : 'thrd_msmt_2hr_chk'	, type : 'string',defaultValue:'N'
		},{	name : 'insp_numb'		, type : 'string'
		},

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'float', defaultValue: '0'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string',defaultValue:_global.login_pk},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string',defaultValue:_global.login_pk},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
		{name: 'stor_id',				type: 'string',defaultValue:_global.stor_id},		//stor_id
	]
});
