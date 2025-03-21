Ext.define('module.custom.komec.prod.workbook.model.WorkBookDetail',{ extend:'Axt.data.Model',
	fields: [
		{name: 'invc_numb',				type: 'string'},		//invoice번호
		{name: 'bzpl_idcd',				type: 'string'},		//사업장ID
		{name: 'acpt_numb',				type: 'string'},		//수주번호
		{name: 'acpt_amnd_degr',		type: 'float '},		//
		{name: 'acpt_seqn',				type: 'float '},		//
		{name: 'pdod_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//일자
		{name: 'cstm_idcd',				type: 'string'},		//
		{name: 'pdsd_numb',				type: 'string'},		//
		{name: 'pdsd_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//
		{name: 'pref_rank',				type: 'float '},		//
		{name: 'indn_qntt',				type: 'float '},		//
		{name: 'work_wkct_name',		type: 'string'},		//공정명
		{name: 'prog_stat_dvcd',		type: 'string'},		//상태
		{name: 'work_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'item_idcd',				type: 'string'},		//품목
		{name: 'item_code',				type: 'string'},		//품목
		{name: 'item_name',				type: 'string'},		//품목
		{name: 'item_spec',				type: 'string'},		//품목
		{name: 'strt_dttm',				type: 'string', convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업시작시간
		{name: 'endd_dttm',				type: 'string', convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업종료시간
		{name: 'cvic_idcd',				type: 'string'},		//설비기계

		{name: 'remk_text',				type: 'string'},		//비고사항
		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'float', defaultValue: '0'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string',defaultValue:_global.login_pk},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string',defaultValue:_global.login_pk},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
