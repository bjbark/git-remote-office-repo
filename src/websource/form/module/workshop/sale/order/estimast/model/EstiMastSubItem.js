Ext.define('module.workshop.sale.order.estimast.model.EstiMastSubItem',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'invc_numb'			, type: 'string' },		//상담번호
		{name: 'line_seqn'			, type: 'float ' },		//순번
		{name: 'assi_seqn'			, type: 'float ' },		//보조순번
		{name: 'shet_idcd'			, type: 'string' },		//용지ID
		{name: 'proc_shet_idcd'		, type: 'string' },		//용지ID
		{name: 'proc_shet_name'		, type: 'string' },		//용지ID
		{name: 'shet_name'			, type: 'string' },		//용지명
		{name: 'etcc_proc_amnt'		, type: 'float ' },		//기타가공금액
		{name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//

		{name: 'sysm_memo',				type: 'string'},						//시스템메모
		{name: 'prnt_idcd',				type: 'string'},						//부모ID
		{name: 'line_levl',				type: 'float' , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string', defaultValue: '0'},		//ROW순서
		{name: 'line_stat',				type: 'string', defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},						//ROW마감
		{name: 'find_name',				type: 'string'},						//찾기명
		{name: 'updt_user_name',		type: 'string'},						//수정사용자명
		{name: 'updt_ipad',				type: 'string'},						//수정IP
		{name: 'updt_dttm',				type: 'string'},						//수정일시
		{name: 'updt_idcd',				type: 'string'},						//수정ID
		{name: 'updt_urif',				type: 'string'},						//수정UI
		{name: 'crte_user_name',		type: 'string'},						//생성사용자명
		{name: 'crte_ipad',				type: 'string'},						//생성IP
		{name: 'crte_dttm',				type: 'string'},						//생성일시
		{name: 'crte_idcd',				type: 'string'},						//생성ID
		{name: 'crte_urif',				type: 'string'},						//생성UI
	],
});

