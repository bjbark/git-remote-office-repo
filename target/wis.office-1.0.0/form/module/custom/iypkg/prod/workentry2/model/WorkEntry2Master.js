Ext.define('module.custom.iypkg.prod.workentry2.model.WorkEntry2Master', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//입고INVOICE번호
		{	name: 'line_seqn',			type: 'float' },		//입고순번
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//입고invoice일자
		{	name: 'acpt_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//수주invoice일자

		{	name: 'acpt_numb',			type: 'string'},		//수주번호
		{	name: 'acpt_seqn',			type: 'float' },		//수주순번
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_code',			type: 'string'},		//거래처코드
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'prod_idcd',			type: 'string'},		//품목ID
		{	name: 'prod_name',			type: 'string'},		//품목명
		{	name: 'prod_code',			type: 'string'},		//품목코드
		{	name: 'prod_leng',			type: 'float' },		//장
		{	name: 'prod_widh',			type: 'float' },		//폭
		{	name: 'prod_hght',			type: 'float' },		//고
		{	name: 'pcod_numb',			type: 'string'},		//고객번호
		{	name: 'acpt_qntt',			type: 'float' },		//수주량
		{	name: 'rnum',				type: 'float' },		//순위
	]
});
