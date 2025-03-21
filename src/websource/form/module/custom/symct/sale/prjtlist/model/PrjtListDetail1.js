Ext.define('module.custom.symct.sale.prjtlist.model.PrjtListDetail1',{ extend:'Axt.data.Model',
	fields : [
		{name: 'pjod_idcd',				type: 'string'},		//프로젝트수주ID
		{name: 'amnd_degr',				type: 'float' },		//AMD차수
		{name: 'amnd_resn',				type: 'string'},		//AMD사유
		{name: 'pjod_code',				type: 'string'},		//프로젝트수주코드
		{name: 'pjod_dvcd',				type: 'string'},		//프로젝트수주구분코드
		{name: 'expt_dvcd',				type: 'string'},		//수출구분코드
		{name: 'prjt_idcd',				type: 'string'},		//프로젝트ID
		{name: 'prjt_name',				type: 'string'},		//프로젝트명
		{name: 'regi_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//등록일자
		{name: 'pjod_name',				type: 'string'},		//프로젝트수주명
		{name: 'cstm_idcd',				type: 'string'},		//거래처ID
		{name: 'cstm_code',				type: 'string'},		//거래처코드
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'item_code',				type: 'string'},		//품목코드
		{name: 'item_name',				type: 'string'},		//품명
		{name: 'item_spec',				type: 'string'},		//품목규격
		{name: 'modl_name',				type: 'string'},		//모델명
		{name: 'esti_amnt',				type: 'float' },		//견적금액
		{name: 'crny_dvcd',				type: 'string'},		//통화구분코드
		{name: 'frst_exam_date',		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//1차시험일자
		{name: 'send_exam_date',		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//2차시험일자
		{name: 'deli_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//납기일자
		{name: 'strt_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//시작일자
		{name: 'endd_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//종료일자
		{name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{name: 'drtr_name',				type: 'string'},		//담당자명
		{name: 'dlvy_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//납품일자
		{name: 'last_yorn',				type: 'string'},		//최종여부
		{name: 'apvl_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//승인일자
		{name: 'amnd_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//amd일자
		{name: 'apvl_drtr_idcd',		type: 'string'},		//승인담당자ID
		{name: 'apvl_drtr_name',		type: 'string'},		//승인담당자명
		{name: 'rank',					type: 'float' },		//순번
		{name: 'buss_name',				type: 'string'},		//사업자명
		{name: 'buss_name',				type: 'string'},		//사업자번호
		{name: 'buss_kind',				type: 'string'},		//업태
		{name: 'buss_type',				type: 'string'},		//업종
		{name: 'corp_dvcd',				type: 'string'},		//사업자구분
		{name: 'boss_name',				type: 'string'},		//대표자명
		{name: 'tele_numb',				type: 'string'},		//전화번호
		{name: 'faxi_numb',				type: 'string'},		//팩스번호
		{name: 'mail_addr',				type: 'string'},		//계산서메일
		{name: 'hdph_numb',				type: 'string'},		//휴대전화
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