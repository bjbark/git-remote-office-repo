Ext.define('module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerDetail',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb',			type: 'string'},		//INVOICE번호
		{	name: 'line_seqn',			type: 'float' },		//순번
		{	name: 'new_invc_numb',		type: 'string'},		//INVOICE번호
		{	name: 'new_line_seqn',		type: 'float' },		//순번
		{	name: 'prog_stat_dvcd',		type: 'string'},		//
		{	name: 'bzpl_idcd',			type: 'string' , defaultValue: _global.stor_id},		//사업장ID
		{	name: 'expt_dvcd',			type: 'string' , defaultValue: '1000'},					//출고구분
		{	name: 'drtr_idcd',			type: 'string'},		//담당자
		{	name: 'drtr_name',			type: 'string'},		//담당자
		{	name: 'cstm_idcd',			type: 'string'},		//거래처
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'cstm_code',			type: 'string'},		//거래처코드
		{	name: 'chk',				type: 'string'},		//
		{	name: 'dept_idcd',			type: 'string'},		//부서
		{	name: 'acpt_numb',			type: 'string'},		//수주번호
		{	name: 'acpt_seqn',			type: 'float' },		//수주순번
		{	name: 'stok_qntt',			type: 'float' },		//수주순번
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'sale_unit',			type: 'string'},		//판매단위
		{	name: 'norm_sale_pric',		type: 'float' },		//정상판매단가
		{	name: 'sale_stnd_pric',		type: 'float' },		//판매기준단가
		{	name: 'sale_pric',			type: 'float' },		//판매단가
		{	name: 'vatx_incl_yorn',		type: 'string'},		//부가세포함여부
		{	name: 'vatx_rate',			type: 'float' },		//부가세율
		{	name: 'sale_amnt',			type: 'float' },		//판매금액
		{	name: 'vatx_amnt',			type: 'float' },		//부가세금액
		{	name: 'ttsm_amnt',			type: 'float' },		//합계금액
		{	name: 'deli_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납기일자
		{	name: 'acpt_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납기일자
		{	name: 'stnd_unit',			type: 'string'},		//기준단위
		{	name: 'stnd_unit_qntt',		type: 'float' },		//기준단위수량
		{	name: 'wrhs_idcd',			type: 'string', defaultValue: '01'},		//창고ID
		{	name: 'dlvy_cstm_idcd',		type: 'string'},		//납품거래처ID
		{	name: 'dely_cstm_name',		type: 'string'},		//납품처
		{	name: 'dsct_yorn',			type: 'string'},		//중단여부
		{	name: 'ostt_dvcd',			type: 'string'},		//출고구분코드
		{	name: 'insp_dvcd',			type: 'string'},		//검사구분코드
		{	name: 'insp_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//검사일자
		{	name: 'pcod_numb',			type: 'string'},		//PONO
		{	name: 'ostt_yorn',			type: 'string'},		//출고여부
		{	name: 'ostt_date',			type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//출고일자
		{	name: 'trst_qntt',			type: 'float' },		//출고수량
		{	name: 'ostt_qntt',			type: 'float' },		//출고수량
		{	name: 'unpaid',				type: 'float'  ,defaultValue:0 },		//미납잔량
		{	name: 'qntt',				type: 'float'  ,defaultValue:0 },		//
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//규격
		{	name: 'unit_name',			type: 'string'},		//단위
		{	name: 'lott_numb',			type: 'string'},		//lot번호
		{	name: 'sale_pric',			type: 'float' ,defaultValue:0 },
		{	name: 'invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: 'ostt_trnt_dvcd',		type: 'string'},		//
		{	name: 'ostt_trnt_amnt',		type: 'float' },		//
		{	name: 'remk_text',			type: 'string'},		//비고
		{	name: 'vatx_dvcd',			type: 'string'},		//
		{	name: 'used_yorn',			type: 'string'},		//oem여부
		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float' , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string', defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string'},		//수정일시
		{	name: 'updt_idcd',			type: 'string'},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string'},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
	],
});
