Ext.define('module.prod.order.prodnotlist.model.ProdNotList',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//INVOICE번호
		{	name: 'line_seqn',			type: 'string'},		//순번
		{	name: 'pdod_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },		//생산지시일자
		{	name: 'wkct_name',			type: 'string'},		//공정명
		{	name: 'cstm_name',			type: 'string' },		//거래처명
		{	name: 'cvic_name',			type: 'string'},		//설비명
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//규격
		{	name: 'poor_caus_bacd',		type: 'string'},		//불량유형
		{	name: 'poor_qntt',			type: 'float' },		//불량수량
		{	name: 'indn_qntt',			type: 'float' },		//지시수량
		{	name: 'prod_qntt',			type: 'float' },		//생산수량
		{	name: 'work_strt_dttm',		type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//작업시작일시
		{	name: 'work_endd_dttm',		type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//작업종료일시

	]
});
