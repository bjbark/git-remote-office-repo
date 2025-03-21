Ext.define('module.custom.iypkg.sale.order.slorlist1.model.SlorList1',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'acpt_numb',			type: 'string'},		//수주ID
		{	name: 'invc_numb',			type: 'string'},		//수주ID
		{	name: 'invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//수주-발주일자
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'prod_name',			type: 'string'},		//제품명
		{	name: 'prod_idcd',			type: 'string'},		//제품ID
		{	name: 'acpt_date',			type: 'string'},		//수주일자
		{	name: 'offr_date',			type: 'string'},		//발주일자
		{	name: 'prod_spec',			type: 'string'},		//상자규격/원단명(골)
		{	name: 'item_fxqt',			type: 'string'},		//절수
		{	name: 'pcod_scre',			type: 'string'},		//pono/ 재단및 스코어
		{	name: 'qntt',				type: 'float' },		//수량
		{	name: 'pqty_pric',			type: 'string'},		//단가
		{	name: 'sply_amnt',			type: 'float' },		//발주공급가
		{	name: 'deli_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납기일자
		{	name: 'ppln_dvcd',			type: 'string'},		//골
		{	name: 'unpaid',				type: 'string'},		//미납잔량
		{	name: 'adtn_amnt',			type: 'string'},		//부가액

		{	name: 'crt_date',			type: 'string'},
		{	name: 'hidden_numb',		type: 'string'},
		{	name: 'hidden_rnum',		type: 'string'},
		{	name: 'rnum',				type: 'string'},
	]
});
