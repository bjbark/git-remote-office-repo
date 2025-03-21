Ext.define('module.custom.iypkg.eis.eisreport.model.EisReportPopup2',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'				, type: 'string'},		//invoice번호
		{	name: 'cvic_idcd'				, type: 'string'},		//설비ID
		{	name: 'cstm_idcd'				, type: 'string'},		//거래처ID
		{	name: 'cstm_name'				, type: 'string'},		//거래처명
		{	name: 'prog_stat_dvcd'			, type: 'string'},		//상태
		{	name: 'work_numb'				, type: 'string'},		//작업번호
		{	name: 'item_name'				, type: 'string'},		//품명
		{	name: 'item_idcd'				, type: 'string'},		//품목ID
		{	name: 'prod_qntt'				, type: 'float' },		//생산수량
		{	name: 'indn_qntt'				, type: 'float' },		//지시수량
		{	name: 'sum_poor_qntt'			, type: 'float' },		//총 불량수량
		{	name: 'work_strt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업시작시간
		{	name: 'work_endd_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업종료시간
	]
});
