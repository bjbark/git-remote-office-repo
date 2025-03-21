Ext.define('module.sale.project.prjtplan.model.PrjtPlanDetail1',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'cvic_idcd',				type: 'string'},		//설비id
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'chek_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//점검일자
		{name: 'chek_dvcd',				type: 'string'},		//점검구분코드
		{name: 'chek_name',				type: 'string'},		//점검명
		{name: 'cvic_name',				type: 'string'},		//설비명
		{name: 'nxrm_chek_date',		type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//차기점검일자
		{name: 'repa_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//수리일자
		{name: 'chek_resn',				type: 'string'},		//점검사유
		{name: 'repa_entr_name',		type: 'string'},		//수리업체명
		{name: 'repa_need_time',		type: 'string'},		//수리소요시간
		{name: 'repa_sbsc_name',		type: 'string'},		//수리항목명
		{name: 'repa_cont',				type: 'string'},		//수리내용
		{name: 'need_amnt',				type: 'float' },		//소요금액
		{name: 'dmge_regn',				type: 'string'},		//고장부위
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
