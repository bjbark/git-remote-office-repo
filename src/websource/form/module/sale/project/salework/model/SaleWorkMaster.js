Ext.define('module.sale.project.salework.model.SaleWorkMaster',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb',				type: 'string'},		//invoice번호
		{name: 'amnd_degr',				type: 'float' },		//amd차수
		{name: 'bzpl_idcd',				type: 'string'},		//사업장id
		{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//invoice일자
		{name: 'ordr_dvcd',				type: 'string'},		//오더구분코드
		{name: 'orig_invc_numb',		type: 'string'},		//원invoice번호
		{name: 'expt_dvcd',				type: 'string'},		//수출구분코드
		{name: 'cstm_idcd',				type: 'string'},		//거래처id
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'modl_name',				type: 'string'},		//차종명
		{name: 'acpt_dvcd',				type: 'string'},		//수주구분코드
		{name: 'ostt_wrhs_idcd',		type: 'string'},		//출고창고id
		{name: 'memo',					type: 'string'},		//메모
		{name: 'line_seqn',				type: 'float' } ,		//순번
		{name: 'item_idcd',				type: 'string'},		//품목id
		{name: 'item_name',				type: 'string'},		//품명
		{name: 'item_spec',				type: 'string'},		//품목규격
		{name: 'unit_idcd',				type: 'string'},		//단위id
		{name: 'pric_adpt',				type: 'string'},		//단가적용
		{name: 'norm_sale_pric',		type: 'float' },		//정상판매단가
		{name: 'sale_stnd_pric',		type: 'float' },		//판매기준단가
		{name: 'invc_qntt',				type: 'float' },		//invoice수량
		{name: 'invc_pric',				type: 'float' } ,		//invoice단가
		{name: 'vatx_incl_yorn',		type: 'string' },		//부가세포함여부 *
		{name: 'vatx_rate',				type: 'float'},			//부가세율
		{name: 'sply_amnt',				type: 'float' } ,		//공급가액
		{name: 'vatx_amnt',				type: 'float' } ,		//부가세금액
		{name: 'invc_amnt',				type: 'float' } ,		//invoice금액
		{name: 'deli_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//납기일자
		{name: 'pcod_numb',				type: 'string' } ,		//  PONO
		{name: 'cstm_offr_date',		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//고객발주일자
		{name: 'cstm_deli_date',		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//고객납기일자
		{name: 'cstm_lott_numb',		type: 'string'},		//  고객lot번호
		{name: 'dlvy_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//납품일자
		{name: 'dlvy_hhmm',				type: 'string'},		// 납품시분
		{name: 'remk_text',				type: 'string'} ,		// 비고
		{name: 'ostt_dvcd',				type: 'string'},		// 출고구분코드
		{name: 'ostt_qntt',				type: 'float'},			// 출고수량
		{name: 'sale_qntt',				type: 'float' },		// 판매수량
		{name: 'dsct_qntt',				type: 'float'},			// 중단수량
		{name: 'sale_sale_amnt',		type: 'float' },		//
		{name: 'sale_vatx_amnt',		type: 'float'},			//
		{name: 'sale_ttsm_amnt',		type: 'float' },		//
		{name: 'drtr_name',				type: 'string' },		//
		{name: 'drtr_idcd',				type: 'string' },		//
		{name: 'cstm_name',				type: 'string' },		//거래처명
	]
});
