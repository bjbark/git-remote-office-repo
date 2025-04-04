Ext.define('module.prod.order.workentry.model.WorkEntryLister4',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'invc_numb'			, type: 'string' },		//INVOICE번호
		{	name: 'line_seqn'			, type: 'float'  },		//순번
		{	name: 'cvic_idcd'			, type: 'string' },		//설비ID
		{	name: 'wker_idcd'			, type: 'string' },		//작업자ID수
		{	name: 'prep_time'			, type: 'float'  },		//준비시간
		{	name: 'work_time'			, type: 'float'  },		//가동시간
		{	name: 'mold_yorn'			, type: 'string' },		//금형여부
		{	name: 'mold_idcd'			, type: 'string' },		//금형ID
		{	name: 'mold_htct'			, type: 'float'  },		//금형타수
		{	name: 'cavity'				, type: 'string' },		//CAVITY
		{	name: 'updt_shot'			, type: 'float'  },		//수정SHOT
		{	name: 'goal_time'			, type: 'float'  },		//목표시간
		{	name: 'qult_halt_time'		, type: 'float'  },		//품질정지시간
		{	name: 'cvic_halt_time'		, type: 'float'  },		//설비정지시간
		{	name: 'mtrl_halt_time'		, type: 'float'  },		//자재정지시간
		{	name: 'etcc_halt_time'		, type: 'float'  },		//기타정지시간
		{	name: 'remk_text'			, type: 'string' },		//비고
		{	name: 'pcmt'				, type: 'string' },		//특이사항
		{	name: 'cvic_stat_dvcd'		, type: 'string' },		//설비상태구분코드
		{	name: 'cvic_code'			, type: 'string' },		//설비코드
		{	name: 'cvic_name'			, type: 'string' },		//설비명
		{	name: 'mold_code'			, type: 'string' },		//금형코드
		{	name: 'mold_name'			, type: 'string' },		//금형명
		{	name: 'rank'				, type: 'string' },		//순번

		{	name: 'uper_seqn'			, type: 'float'  },		//상위순번
		{	name: 'disp_seqn'			, type: 'float'  },		//표시순번

		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
		{	name: 'line_stat'			, type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'			, type: 'string' },		//ROW마감
		{	name: 'find_name'			, type: 'string' },		//찾기명
		{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'			, type: 'string' },		//수정IP
		{	name: 'updt_dttm'			, type: 'string' },		//수정일시
		{	name: 'updt_idcd'			, type: 'string' },		//수정ID
		{	name: 'updt_urif'			, type: 'string' },		//수정UI
		{	name: 'crte_user_name'		, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'			, type: 'string' },		//생성IP
		{	name: 'crte_dttm'			, type: 'string' },		//생성일시
		{	name: 'crte_idcd'			, type: 'string' },		//생성ID
		{	name: 'crte_urif'			, type: 'string' },		//생성UI
	]
});
