Ext.define('module.prod.mold.moldcheck.model.MoldCheckDetail2',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'mold_idcd'			, type: 'string' },		//금형id
		{	name: 'line_seqn'			, type: 'float'  },		//순번
		{	name: 'chek_date'			, type: 'string'  , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//점검일자
		{	name: 'chek_time'			, type: 'string'  , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//점검시간
		{	name: 'dept_idcd'			, type: 'string' },		//부서ID
		{	name: 'dept_code'			, type: 'string' },		//부서코드
		{	name: 'dept_name'			, type: 'string' },		//부서명
		{	name: 'drtr_idcd'			, type: 'string'  , defaultValue : _global.login_id},		//당당자ID
		{	name: 'drtr_name'			, type: 'string'  , defaultValue : _global.login_nm},		//담당자명
		{	name: 'base_clen'			, type: 'string' },		//베이스세정
		{	name: 'lbct_appl'			, type: 'string' },		//구리스도포
		{	name: 'airr_clen'			, type: 'string' },		//에어청소
		{	name: 'core_clen'			, type: 'string' },		//코아세정
		{	name: 'core_rust'			, type: 'string' },		//코아방청
		{	name: 'remk_text'			, type: 'string' },		//비고
		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
		{	name: 'line_stat'			, type: 'string'  , defaultValue: '0'},		//ROW상태
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
