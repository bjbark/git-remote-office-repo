Ext.define('module.custom.iypkg.eis.eisreport.model.EisReportPopup',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'				, type: 'string'},		//invoice번호
		{	name: 'cvic_idcd'				, type: 'string'},		//설비ID
		{	name: 'cstm_idcd'				, type: 'string'},		//거래처ID
		{	name: 'cstm_name'				, type: 'string'},		//거래처명
		{	name: 'prog_stat_dvcd'			, type: 'string'},		//상태
		{	name: 'item_name'				, type: 'string'},		//품명
		{	name: 'item_idcd'				, type: 'string'},		//품목ID
		{	name: 'indn_qntt'				, type: 'float' },		//지시수량
//		{	name: 'work_strt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업시작시간
//		{	name: 'work_endd_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업종료시간
	]
});
