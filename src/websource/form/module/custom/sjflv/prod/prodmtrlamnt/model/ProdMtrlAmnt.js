Ext.define('module.custom.sjflv.prod.prodmtrlamnt.model.ProdMtrlAmnt',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'real_end',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//작업일자
		{name: 'job_order_no',			type: 'string'},		//제품명
		{name: 'prod_nm',				type: 'string'},		//제품명
		{name: 'item_name',				type: 'string'},		//제품명
		{name: 'batch_no',				type: 'string'},		//lot번호
		{name: 'prod_cnt_result',		type: 'float', },		//생산량
		{name: 'item_spec',				type: 'string', },		//품목규격
		{name: 'part_cd',				type: 'string', },		//자재명
		{name: 'recipe_rate',			type: 'float', },		//배합비
		{name: 'used_amount',			type: 'float', },		//사용량
		{name: 'ostt_amnt',				type: 'float', },		//출고가격
	]
});
