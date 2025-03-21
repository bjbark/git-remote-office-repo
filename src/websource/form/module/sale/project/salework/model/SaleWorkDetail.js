Ext.define('module.sale.project.salework.model.SaleWorkDetail',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb',				type: 'string'},		//INVOICE번호
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'acpt_numb',				type: 'string'},		//수주번호
		{name: 'acpt_seqn',				type: 'float' },		//수주순번
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'sale_unit',				type: 'string'},		//판매단위
		{name: 'norm_sale_pric',		type: 'float' },		//정상판매단가
		{name: 'sale_stnd_pric',		type: 'float' },		//판매기준단가
		{name: 'sale_pric',				type: 'float' } ,		//판매단가
		{name: 'sale_qntt',				type: 'float '},		//판매수량
		{name: 'vatx_incl_yorn',		type: 'string'},		//부가세포함여부
		{name: 'vatx_rate',				type: 'float '},		//부가세율
		{name: 'sale_amnt',				type: 'float ', defaultValue: '0'},		//판매금액
		{name: 'vatx_amnt',				type: 'float ', defaultValue: '0'},		//부가세금액
		{name: 'ttsm_amnt',				type: 'float ', defaultValue: '0'},		//합계금액
		{name: 'dlvy_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납품일자
		{name: 'dlvy_hhmm',				type: 'string'},		//납품시분
		{name: 'stnd_unit',				type: 'string'},		//기준단위
		{name: 'stnd_unit_qntt',		type: 'float' },		//기준단위수량
		{name: 'wrhs_idcd',				type: 'string' },		//창고ID
		{name: 'dlvy_cstm_idcd',		type: 'string' },		//납품거래처ID
		{name: 'pcod_nmbr',				type: 'string' },		//PONO
		{name: 'uper_seqn',				type: 'float' },		//상위순번
		{name: 'disp_seqn',				type: 'float' },		//표시순번
		{name: 'colt_amnt',				type: 'float' },		//수금액
		{name: 'yotp_amnt',				type: 'float' },		//미수잔액


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
		{name: 'updt_idcd',				type: 'string', defaultValue : _global.login_pk},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string', defaultValue : _global.login_pk},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	],
	recalculation : function(inv) {
		var row = this
		;
		row.set('vatx_amnt'	, Math.floor(row.get('sale_amnt')/1000)*10 );
		row.set('ttsm_amnt'	, row.get('sale_amnt') + row.get('vatx_amnt')) ;
	}
});