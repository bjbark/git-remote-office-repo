Ext.define('module.custom.sjflv.sale.etc.smplprod.model.SmplProd',{ extend:'Axt.data.Model',
	 fields:
	[
		{name: 'insp_type_idcd',		type: 'string'},		//검사유형ID
		{name: 'insp_type_code',		type: 'string'},		//검사코드
		{name: 'insp_type_name',		type: 'string'},		//검사유형명
		{name: 'insp_mthd_dvcd',		type: 'string'},		//검사방법구분코드
		{name: 'wkct_idcd',				type: 'string'},		//공정ID
		{name: 'wkct_code',				type: 'string'},		//공정코드
		{name: 'wkct_name',				type: 'string'},		//공정명
		{name: 'smor_rate',				type: 'float'},			//시료율
		{name: 'wkct_insp_yorn',		type: 'string', defaultValue: '0'},		//공정검사여부
		{name: 'rcpt_insp_yorn',		type: 'string', defaultValue: '0'},		//인수검사여부
		{name: 'last_insp_yorn',		type: 'string', defaultValue: '0'},		//최종검사여부
		{name: 'shpm_insp_yorn',		type: 'string', defaultValue: '0'},		//출고검사여부
		{name: 'insp_cond',				type: 'string'},		//검사조건
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
		{name: 'crte_dttm',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
