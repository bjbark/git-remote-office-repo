Ext.define('module.prod.order.workbook.model.WorkBookDetail1',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb'				, type: 'string'},		//INVOICE번호
		{name: 'invc_date'				, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//INVOICE일자
		{name: 'line_seqn'				, type: 'float' },		//순번
		{name: 'work_pcnt_dvcd'			, type: 'string'},		//작업인원구분코드
		{name: 'work_sttm'				, type: 'string'},	//작업시작시간
		{name: 'work_edtm'				, type: 'string'},	//작업종료시간
		{name: 'work_pcnt'				, type: 'float' },		//작업인원
		{name: 'need_time'				, type: 'string', convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},	//소요시간
		{name: 'work_mnhr'				, type: 'float' },		//작업공수
		{name: 'drtr_idcd'				, type: 'string' },		//담당자ID
		{name: 'drtr_name'				, type: 'string' },		//담당자명
		{name: 'remk_text'				, type: 'string' },		//비고
		{name: 'uper_seqn'				, type: 'float' },		//상위순번
		{name: 'disp_seqn'				, type: 'float' },		//표시순번
		{name: 'wkod_numb'				, type: 'string' },		//주문번호

		{name: 'user_memo'				, type: 'string' },		//사용자메모
		{name: 'sysm_memo'				, type: 'string' },		//시스템메모
		{name: 'prnt_idcd'				, type: 'string' },		//부모ID
		{name: 'line_levl'				, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr'				, type: 'string' },		//ROW순서
		{name: 'line_stat'				, type: 'string'  , defaultValue: '0'},		//ROW상태
		{name: 'line_clos'				, type: 'string' },		//ROW마감
		{name: 'find_name'				, type: 'string' },		//찾기명
		{name: 'updt_user_name'			, type: 'string' },		//수정사용자명
		{name: 'updt_ipad'				, type: 'string' },		//수정IP
		{name: 'updt_dttm'				, type: 'string' },		//수정일시
		{name: 'updt_idcd'				, type: 'string' },		//수정ID
		{name: 'updt_urif'				, type: 'string' },		//수정UI
		{name: 'crte_user_name'			, type: 'string' },		//생성사용자명
		{name: 'crte_ipad'				, type: 'string' },		//생성IP
		{name: 'crte_dttm'				, type: 'string' },		//생성일시
		{name: 'crte_idcd'				, type: 'string' },		//생성ID
		{name: 'crte_urif'				, type: 'string' },		//생성UI
	]
});
