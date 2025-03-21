Ext.define('module.prod.mold.moldshot.model.MoldShotDetail',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'mold_idcd'			, type: 'string' },		//금형id
		{	name: 'line_seqn'			, type: 'float'  },		//순번
		{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//일자
		{	name: 'invc_numb'			, type: 'string' },		//작업번호
		{	name: 'invc_seqn'			, type: 'float' },		//작업순번
		{	name: 'item_idcd'			, type: 'string' },		//아이템id
		{	name: 'cvic_idcd'			, type: 'string' },		//설비id
		{	name: 'cavity'				, type: 'float'  },		//cavity
		{	name: 'init_shot'			, type: 'float'  },		//초기SHOT
		{	name: 'work_shot'			, type: 'float'  },		//작업SHOT
		{	name: 'updt_shot'			, type: 'float'  },		//수정SHOT
		{	name: 'totl_shot'			, type: 'float'  },		//누계SHOT
		{	name: 'temp_totl_shot'		, type: 'float'  },		//임시누계SHOT
		{	name: 'uper_seqn'			, type: 'float'  },		//상위순번
		{	name: 'disp_seqn'			, type: 'float'  },		//표시순번
		{	name: 'cvic_name'			, type: 'string' },		//설비명
		{	name: 'item_code'			, type: 'string' },		//품목코드
		{	name: 'item_name'			, type: 'string' },		//작업품명
		{	name: 'seq'					, type: 'float' },		//작업품명

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
