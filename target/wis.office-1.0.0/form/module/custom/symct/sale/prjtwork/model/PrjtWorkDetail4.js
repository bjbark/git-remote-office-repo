Ext.define('module.custom.symct.sale.prjtwork.model.PrjtWorkDetail4',{ extend:'Axt.data.Model',
	fields: [
		{name: 'pjod_idcd',				type: 'string'},		//프로젝트수주ID
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'cnsl_dttm',				type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//상담일시
		{name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{name: 'drtr_name',				type: 'string'},		//담당자명
		{name: 'cstm_dept_name',		type: 'string'},		//고객부서명
		{name: 'cstm_drtr_name',		type: 'string'},		//고객담당자명
		{name: 'cnsl_cont',				type: 'string'},		//상담내용
		{name: 'cost_yorn',				type: 'string'},		//원가여부
		{name: 'dsig_yorn',				type: 'string'},		//설계여부
		{name: 'puch_yorn',				type: 'string'},		//구매여부
		{name: 'otod_yorn',				type: 'string'},		//외주여부
		{name: 'prod_yorn',				type: 'string'},		//생산여부
		{name: 'rply_reqt_yorn',		type: 'string'},		//회신요청여부
		{name: 'rply_mthd_dvcd',		type: 'string'},		//회신방법구분코드
		{name: 'rply_drtr_idcd',		type: 'string'},		//회신담당자ID
		{name: 'rply_dttm',				type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr } ,		//회신일시
		{name: 'rply_cont',				type: 'string'},		//회신내용
		{name: 'remk_text',				type: 'string'},		//비고
		{name: 'uper_seqn',				type: 'float' },		//상위순번
		{name: 'disp_seqn',				type: 'float' },		//표시순번
		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
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
	]
});
