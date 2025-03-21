Ext.define('module.custom.sjflv.prod.order.workbook.model.WorkBookMtrlPopup',{ extend:'Axt.data.Model',
	fields : [
		{name: 'acct_bacd'	, type: 'string'},	//계정구분코드
	 	{name: 'acct_name'	, type: 'string'},	//계정구분명
	 	{name: 'item_idcd'	, type: 'string'},	//원재료ID
	 	{name: 'item_code'	, type: 'string'},	//원재료코드
		{name: 'item_name'	, type: 'string'},	//품명
		{name: 'item_spec'	, type: 'string' },	//규격
		{name: 'unit_idcd'	, type: 'string' },	//단위ID
		{name: 'mixx_rate'	, type: 'float'},	//배합비
		{name: 'need_qntt'	, type: 'float'},	//소요량
		{name: 'stok_qntt'	, type: 'float'},	//가용재고
		{name: 'baln_qntt'	, type: 'float'},	//과부족량
		{name: 'ivst_qntt'	, type: 'float'},	//투입량
		{name: 'lott_numb'	, type: 'string'},	//LOT번호
	]
});
