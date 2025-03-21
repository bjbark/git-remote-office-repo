Ext.define('module.prod.mold.moldmast.model.MoldMastMove', { extend:'Axt.data.Model',
	fields: [
		{	name: 'mold_idcd'			, type: 'string' },		//금형ID
		{	name: 'line_seqn'			, type: 'float'  },		//순번
		{	name: 'move_date'			, type: 'string' , renderer : Ext.util.Format.dateRenderer('Y/m/d'),convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//이동일자
		{	name: 'move_purp_dvcd'		, type: 'string' },		//이동목적구분코드
		{	name: 'move_loct_name'		, type: 'string' },		//이동장소명
		{	name: 'move_memo'			, type: 'string' },		//이동메모
		{	name: 'zone_name'			, type: 'string' },		//구역명
		{	name: 'befr_loct_dvcd'		, type: 'string' },		//전장소구분코드
		{	name: 'befr_loct_name'		, type: 'string' },		//전장소명
		{	name: 'last_yorn'			, type: 'string' },		//최종여부
		{	name: 'wrhs_idcd'			, type: 'string' },		//창고

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

