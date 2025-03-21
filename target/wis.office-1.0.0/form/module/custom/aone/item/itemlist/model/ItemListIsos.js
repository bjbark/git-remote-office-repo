Ext.define('module.custom.aone.item.itemlist.model.ItemListIsos',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'wrhs_idcd',			type: 'string'},		//창고ID
		{	name: 'invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//수불일자
		{	name: 'invc_numb',			type: 'string'},		//수불근거
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//규격
		{	name: 'remk_text',			type: 'string'},		//수불구분
		{	name: 'cstm_name',			type: 'string'},		//수불거래처
		{	name: 'istt_qntt',			type: 'float '},		//입고수량
		{	name: 'ostt_qntt',			type: 'float '},		//출고수량

//		{	name: 'stok_qntt',			type: 'float',
//			convert : function(newValue , row){
//				return row.get('stok_qntt2') + row.get('istt_qntt') - row.get('ostt_qntt')
//			}
//			},		//재고수량
//		{	name: 'stok_qntt2',			type: 'float' },		//기초재고

	]
});
