Ext.define('module.custom.hjsys.prod.workentry.model.WorkEntryPoorLister', { extend:'Axt.data.Model',
	fields: [
		//work_book
		{	name: 'new_invc_numb'	, type: 'string' },		//INVOICE번호
		{	name: 'invc_date'		, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//INVOICE날짜
		{	name: 'work_strt_dttm'	, type: 'string' , serialize: Ext.util.Format.dateToStr},		//시작일시
		{	name: 'work_endd_dttm'	, type: 'string' , serialize: Ext.util.Format.dateToStr},		//종료일시
		{	name: 'cstm_idcd'		, type: 'string' },		//거래처ID
		{	name: 'wkct_idcd'		, type: 'string' },		//공정ID
		{	name: 'item_idcd'		, type: 'string' },		//품목ID
		{	name: 'wkod_numb'		, type: 'string' },		//작업일지번호
		{	name: 'wkod_seqn'		, type: 'string' },		//작업일지순번
		{	name: 'indn_qntt'		, type: 'flaot'  },		//지시수량
		{	name: 'good_qntt'		, type: 'flaot'  },		//양품수량
		{	name: 'poor_qntt'		, type: 'flaot'  },		//불량수량
		{	name: 'wker_idcd'		, type: 'string' },		//작업자ID
		{	name: 'prog_stat_dvcd'	, type: 'string' },		//진행상태구분코드

		//work_book_qc
		{	name: 'poor_bacd'		, type: 'string' },		//불량코드
		{	name: 'poor_name'		, type: 'string' },		//불량명
		{	name: 'sttm'			, type: 'string' , convert : Ext.util.Format.strToTime},		//유실시작시간
		{	name: 'edtm'			, type: 'string' , convert : Ext.util.Format.strToTime},		//유실종료시간
	]
});

