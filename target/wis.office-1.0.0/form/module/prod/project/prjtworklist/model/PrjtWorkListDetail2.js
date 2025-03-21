Ext.define('module.prod.project.prjtworklist.model.PrjtWorkListDetail2',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb',				type: 'string'},		//invoice번호
		{name: 'amnd_degr',				type: 'float' },		//차수
		{name: 'line_seqn',				type: 'float' } ,		//순번
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'item_code',				type: 'string'},		//품목코드
		{name: 'item_name',				type: 'string'},		//품명
		{name: 'unit_idcd',				type: 'string'},		//단위ID
		{name: 'unit_name',				type: 'string'},		//단위명
		{name: 'cstm_idcd',				type: 'string'},		//거래처ID
		{name: 'cstm_code',				type: 'string'},		//거래처코드
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'make_cmpy_name',		type: 'string'},		//제조회사명
		{name: 'offr_qntt',				type: 'float' },		//발주수량
		{name: 'offr_pric',				type: 'float' },		//발주단가
		{name: 'vatx_incl_yorn',		type: 'string'},		//부가세포함여부
		{name: 'vatx_rate',				type: 'float' },		//부가세율
		{name: 'offr_amnt',				type: 'float' },		//발주금액
		{name: 'offr_vatx',				type: 'float' },		//발주부가세
		{name: 'ttsm_amnt',				type: 'float' },		//합계금액
		{name: 'deli_reqt_date',		type: 'string'},		//납기요청일자
		{name: 'deli_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//납기일자
		{name: 'pric_dvcd',				type: 'string'},		//단가구분코드
		{name: 'fund_dvcd',				type: 'string'},		//자금구분코드
		{name: 'dlvy_qntt',				type: 'float' },		//납품수량
		{name: 'dvly_time',				type: 'float' },		//납품시간
		{name: 'send_deli_date',		type: 'string'},		//2차납기일자
		{name: 'dlby_wrhs_idcd',		type: 'string'},		//납품창고ID
		{name: 'krwn_pric',				type: 'float' },		//원화단가
		{name: 'krwn_vatx',				type: 'float' },		//원화부가세
		{name: 'krwn_amnt',				type: 'float' },		//원화금액
		{name: 'krwn_amnt_totl',		type: 'float' },		//원화금액계
		{name: 'krwn_remk_text',		type: 'string'},		//내부비고
		{name: 'otsd_remk_text',		type: 'string'},		//외부비고
		{name: 'stnd_unit',				type: 'string'},		//기준단위
		{name: 'orig_invc_numb',		type: 'string'},		//원invoice번호
		{name: 'orig_invc_degr',		type: 'float' },		//원차수
		{name: 'orig_seqn',				type: 'float' },		//원순번
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
