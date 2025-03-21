Ext.define('module.custom.iypkg.prod.dailyworklist.model.DailyWorkList',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'invc_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//생산일자
		{name: 'wkct_idcd',				type: 'string'},		//공정ID
		{name: 'wkct_name',				type: 'string'},		//공정명
		{name: '',				type: 'string'},		//보조명
		{name: 'work_unit',				type: 'string'},		//작업단위
		{name: 'qntt_unit',				type: 'string'},		//수량단위
		{name: 'invc_numb',				type: 'string'},		//작업번호
		{name: 'prod_qntt',				type: 'float'},			//생산량
		{name: 'invc_pric',				type: 'float'},			//단가
		{name: 'sply_amnt',				type: 'float'},			//공급가액
		{name: '',				type: 'float'},			//감량
		{name: 'shot',					type: 'float'},			//shot
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'prod_name',				type: 'string'},		//품명
		{name: 'prod_spec',				type: 'string'},		//품목규격
		{name: 'work_strt_dttm',		type: 'string'	/* 시작일시		*/ , convert : Ext.util.Format.strToDateTime },
		{name: 'work_endd_dttm',		type: 'string'	/* 종료일시		*/ , convert : Ext.util.Format.strToDateTime },

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float', defaultValue: '0'},	//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string', defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
		{name: 'prnt_dept_code',		type: 'string'},		//상위부서코드
		{name: 'prnt_dept_name',		type: 'string'},		//상위부서명
	]
});
