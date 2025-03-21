Ext.define('module.sale.order.slorlist7.model.SlorList7Master1',{ extend:'Axt.data.Model',
	fields : [
		{	name: '수주일자',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//거래처ID
		{	name: '수주처명',			type: 'string'},		//거래처명
		{	name: '품명',			type: 'string'},		//거래처명
		{	name: '수주처명',			type: 'string'},		//거래처명
		{	name: 'pono',			type: 'string'},		//거래처명
		{	name: '수주수량',			type: 'float '},		//주문건수
		{	name: '납기요청일',		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: '납기일',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: '단가',			type: 'float '},		//주문금액
		{	name: '공급가액',			type: 'float '},		//납기준수건수
		{	name: '지연일',			type: 'float '},		//납기미준수건수
	]
});
