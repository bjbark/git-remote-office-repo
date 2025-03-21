Ext.define('module.prod.wmold.wmoldcheck.model.WmoldCheckDetail1',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'mold_idcd'			, type: 'string' },		//금형id
		{	name: 'line_seqn'			, type: 'float'  },		//순번
		{	name: 'repa_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//점검일자
		{	name: 'repa_cont'			, type: 'string' },		//수리내용
		{	name: 'repa_resn'			, type: 'string' },		//수리사유
		{	name: 'repa_need_time'		, type: 'string' },		//수리소요시간
		{	name: 'repa_entr_name'		, type: 'string' },		//수리업체명
		{	name: 'need_amnt'			, type: 'float'  },		//소요금액
		{	name: 'init_shot'			, type: 'float'  },		//초기SHOT
		{	name: 'updt_expc_shot'		, type: 'float'  },		//수정예상SHOT
		{	name: 'updt_expc_date'		, type: 'float'  ,defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//수정예상일자
		{	name: 'uper_seqn'			, type: 'float'  },		//상위순번
		{	name: 'totl_shot'			, type: 'float'  },		//누계SHOT
		{	name: 'disp_seqn'			, type: 'float'  },		//표시순번
		{	name: 'mold_stat_dvcd'		, type: 'string' , defaultValue :'정상' },	//금형상태구분코드



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
