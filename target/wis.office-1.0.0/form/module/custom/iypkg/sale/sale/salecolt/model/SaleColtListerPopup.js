Ext.define('module.custom.iypkg.sale.sale.salecolt.model.SaleColtListerPopup',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb',				type: 'string'},		//매출번호
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'acpt_numb',				type: 'string'},		//수주번호
		{name: 'acpt_seqn',				type: 'float' },		//수주순번
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'sale_unit',				type: 'string'},		//판매단위
		{name: 'norm_sale_pric',		type: 'float' },		//정상판매단가
		{name: 'sale_stnd_pric',		type: 'float' },		//판매기준단가
		{name: 'sale_pric',				type: 'float' },		//판매단가
		{name: 'sale_qntt',				type: 'float' },		//판매수량
		{name: 'vatx_incl_yorn',		type: 'string'},		//부가세포함여부
		{name: 'vatx_rate',				type: 'float' },		//부가세율
		{name: 'sale_amnt',				type: 'float' },		//판매금액
		{name: 'vatx_amnt',				type: 'float' },		//부가세금액
		{name: 'ttsm_amnt',				type: 'float' },		//합계금액
		{name: 'dlvy_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납품일자
		{name: 'dlvy_hhmm',				type: 'string'},		//납품시분
		{name: 'stnd_unit',				type: 'string'},		//기준단위
		{name: 'stnd_unit_qntt',		type: 'float' },		//기준단위수량
		{name: 'wrhs_idcd',				type: 'string'},		//창고ID
		{name: 'dlvy_cstm_idcd',		type: 'string'},		//납품거래처ID
		{name: 'pcod_nmbr',				type: 'float' },		//PONO
		{name: 'uper_seqn',				type: 'float' },		//상위순번
		{name: 'disp_seqn',				type: 'float' },		//표시순번
		{name: 'yotp_amnt',				type: 'float' },		//미수금액
		{name: 'colt_amnt',				type: 'float' , defaultValue: '0'},		//수금액
		{name: 'colt_dvcd',				type: 'string' },		//수금구분

/* form data */
		{name: 'form_invc_numb',		type: 'string'},		//invc_numb(colt_mast)
		{name: 'form_invc_date',		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//invc_date
		{name: 'form_cstm_idcd',		type: 'string'},		//거래처
		{name: 'form_drtr_idcd',		type: 'string'},		//담당자
		{name: 'form_dept_idcd',		type: 'string'},			//부서
		{name: 'form_iput_amnt_date',	type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},			//입금일
		{name: 'form_publ_date',		type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},			//발행일자
		{name: 'form_expr_date',		type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},			//만기일자
		{name: 'form_paym_bank_name',	type: 'string'},		//승인여부
		{name: 'form_stot_dvcd',		type: 'string'},		//결제구분코드
		{name: 'form_stot_bass',		type: 'string'},		//결제근거
	],
	recalculation : function(inv) {
		var row = this
		;
		row.set('vatx_amnt'	, Math.floor(row.get('sale_amnt')/1000)*10 );
		row.set('ttsm_amnt'	, row.get('sale_amnt') + row.get('vatx_amnt')) ;
	}
});