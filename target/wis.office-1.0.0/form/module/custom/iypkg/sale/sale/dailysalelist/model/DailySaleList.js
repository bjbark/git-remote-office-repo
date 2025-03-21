Ext.define('module.custom.iypkg.sale.sale.dailysalelist.model.DailySaleList',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'ostt_date',				type: 'string', convert : Ext.util.Format.strToDate },		//매출일자
		{name: 'cstm_name',				type: 'string'},		//매출처명
		{name: 'pcod_numb',				type: 'string'},		//p/o no
		{name: 'prod_name',				type: 'string'},		//품명
		{name: 'bxty_spec',				type: 'string'},		//상자규격
		{name: 'ostt_qntt',				type: 'string' },		//출고수량
		{name: 'sale_pric',				type: 'string' },		//판매단가
		{name: 'sale_amnt',				type: 'float' },		//공금가액
		{name: 'vatx_amnt',				type: 'float' },		//부가세액
		{name: 'ttsm_amnt',				type: 'float' },		//합계금액
		{name: 'user_memo',				type: 'string'},		//비고
		{name: 'rnum',					type: 'string'},
	]
});
