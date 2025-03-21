Ext.define('module.custom.iypkg.prod.workentry2.model.WorkEntry2Master2', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//발주INVOICE번호
		{	name: 'line_seqn',			type: 'string'},		//발주순번
		{	name: 'offr_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//발주일자
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//수주일자
		{	name: 'acpt_numb',			type: 'string'},		//수주번호
		{	name: 'cstm_idcd',			type: 'string'},		//수주처ID
		{	name: 'cstm_code',			type: 'string'},		//수주처코드
		{	name: 'cstm_name',			type: 'string'},		//수주처명
		{	name: 'acpt_qntt',			type: 'float' },		//수주량
		{	name: 'pcod_numb',			type: 'string'},		//고객번호
		{	name: 'prod_idcd',			type: 'string'},		//품목ID
		{	name: 'prod_code',			type: 'string'},		//품목코드
		{	name: 'prod_name',			type: 'string'},		//품목명
		{	name: 'prod_leng',			type: 'float' },		//장
		{	name: 'prod_widh',			type: 'float' },		//폭
		{	name: 'prod_hght',			type: 'float' },		//고
		{	name: 'rnum',				type: 'float' },		//순위

	]
});
