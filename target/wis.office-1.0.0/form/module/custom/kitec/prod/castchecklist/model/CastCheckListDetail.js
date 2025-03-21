Ext.define('module.custom.kitec.prod.castchecklist.model.CastCheckListDetail',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },		//invoice 일자
		{	name: 'wkct_idcd',			type: 'string'},		//공정ID
		{	name: 'cvic_idcd',			type: 'string'},		//설비ID
		{	name: 'cond_dvcd',			type: 'string'},		//조건구분코드
		{	name: 'line_seqn',			type: 'float' },		//순번
		{	name: 'cond_name',			type: 'string'},		//조건명
		{	name: 'stup_veri',			type: 'string'},		//셋업검증
		{	name: 'unit_name',			type: 'string'},		//단위명
		{	name: 'frst_msmt',			type: 'string'},		//1차측저
		{	name: 'send_msmt',			type: 'string'},		//2차측정
		{	name: 'thrd_msmt',			type: 'string'},		//3차측정

		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string'},		//수정일시
		{	name: 'updt_idcd',			type: 'string'},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string'},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
	]
});
