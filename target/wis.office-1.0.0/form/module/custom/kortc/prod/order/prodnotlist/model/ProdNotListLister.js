Ext.define('module.custom.kortc.prod.order.prodnotlist.model.ProdNotListLister', { extend: 'Axt.data.Model',
	fields: [
		{	name: '수주일자',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//거래처ID
		{	name: '수주처명',			type: 'string'},		//거래처명
		{	name: '품명',			type: 'string'},		//거래처명
		{	name: '수주처명',			type: 'string'},		//거래처명
		{	name: '수주수량',			type: 'float '},		//주문건수
		{	name: '납기요청일',		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: '납기일',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: '생산량',			type: 'float '},		//주문금액
		{	name: '불량수량',			type: 'float '},		//납기준수건수
		{	name: '납품수량',			type: 'float '},		//납기준수건수
	],
});