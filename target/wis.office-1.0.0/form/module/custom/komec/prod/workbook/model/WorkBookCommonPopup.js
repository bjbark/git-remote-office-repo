Ext.define('module.custom.komec.prod.workbook.model.WorkBookCommonPopup',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'				, type: 'string'},		//invoice번호
		{	name: 'line_seqn'				, type: 'float'},		//순번
		{	name: 'invc_date'				, type: 'string'},		//
		{	name: 'wkfw_seqn'				, type: 'float'},		//공정흐름순번
		{	name: 'wkct_idcd'				, type: 'string'},		//공정ID
		{	name: 'wkct_name'				, type: 'string'},		//공정명
		{	name: 'pdsd_numb'				, type: 'string'},		//생산계획번호
		{	name: 'work_numb'				, type: 'string'},		//작업번호
		{	name: 'wker_idcd'				, type: 'string'},		//
		{	name: 'lott_numb'				, type: 'string'},		//
		{	name: 'cvic_idcd'				, type: 'string'},		//
		{	name: 'item_idcd'				, type: 'string'},		//품목Id
		{	name: 'indn_qntt'				, type: 'float' },		//지시수량
		{	name: 'need_time'				, type: 'string' },		//생산소요시간
		{	name: 'prod_qntt'				, type: 'float' },		//생산수량
		{	name: 'last'					, type: 'float' },		//

		{	name: 'prog_stat_dvcd'			, type: 'string'},		//진행상태


		{	name: 'user_memo',				type: 'string'},		//사용자메모
		{	name: 'sysm_memo',				type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',				type: 'string'},		//부모ID
		{	name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',				type: 'float', defaultValue: '0'},		//ROW순서
		{	name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',				type: 'string'},		//ROW마감
		{	name: 'find_name',				type: 'string'},		//찾기명
		{	name: 'updt_user_name',			type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',				type: 'string'},		//수정IP
		{	name: 'updt_dttm',				type: 'string'},		//수정일시
		{	name: 'updt_idcd',				type: 'string',defaultValue:_global.login_pk},		//수정ID
		{	name: 'updt_urif',				type: 'string'},		//수정UI
		{	name: 'crte_user_name',			type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',				type: 'string'},		//생성IP
		{	name: 'crte_dttm',				type: 'string'},		//생성일시
		{	name: 'crte_idcd',				type: 'string',defaultValue:_global.login_pk},		//생성ID
		{	name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
