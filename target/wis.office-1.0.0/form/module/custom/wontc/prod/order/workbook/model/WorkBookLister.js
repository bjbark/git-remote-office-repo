Ext.define('module.custom.wontc.prod.order.workbook.model.WorkBookLister',{ extend:'Axt.data.Model',
	fields : [
		{name: 'pjod_idcd',				type: 'string'},		//프로젝트ID
		{name: 'wkct_idcd',				type: 'string'},		//공정ID
		{name: 'wkct_code',				type: 'string'},		//공정코드
		{name: 'wkod_numb',				type: 'string'},		//지시번호
		{name: 'wkct_name',				type: 'string'},		//공정명
		{name: 'invc_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//invoice일자
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'work_ordr_dvcd',		type: 'string'},		//작업오더구분코드
		{name: 'progress',				type: 'float' },		//진척율
		{name: 'wker_name',				type: 'string'},		//작업자명
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'item_name',				type: 'string'},		//품목명
		{name: 'cvic_idcd',				type: 'string'},		//설비ID
		{name: 'cvic_code',				type: 'string'},		//설비코드
		{name: 'cvic_name',				type: 'string'},		//설비명
		{name: 'work_cont',				type: 'string'},		//작업내용
		{name: 'indn_qntt',				type: 'float' },		//지시수량
		{name: 'prod_qntt',				type: 'float' },		//생산수량
		{name: 'good_qntt',				type: 'float' },		//양품수량
		{name: 'poor_qntt',				type: 'float' },		//불량수량
		{name: 'work_strt_dttm',		type: 'string', convert : Ext.util.Format.strToDateTime},	//작업시작시간
		{name: 'work_endd_dttm',		type: 'string', convert : Ext.util.Format.strToDateTime },	//작업종료시간
		{name: 'need_time',				type: 'string'},		//소요시간
		{name: 'work_mnhr',				type: 'float' },		//작업공수
		{name: 'work_pcnt',				type: 'float' },		//작업인원
		{name: 'work_dvcd',				type: 'string'},		//작업구분코드
		{name: 'wkct_insp_yorn',		type: 'string'},		//공정검사여부
		{name: 'prog_stat_dvcd',		type: 'string'},		//진행상태구분코드
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
