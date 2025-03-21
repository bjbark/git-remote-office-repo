Ext.define('module.custom.wontc.prod.order.workentry.model.WorkEntryLister2', { extend:'Axt.data.Model',
	fields: [
		{	name: 'wkct_idcd'		, type: 'string' },		//wkct_idcd
		{	name: 'wkct'			, type: 'string' },		//공정
		{	name: 'wkct_code'		, type: 'string' },		//공정코드
		{	name: 'line_seqn'		, type: 'string' },		//순번
		{	name: 'wkct_1'			, type: 'string' },		//설계
		{	name: 'wkct_2'			, type: 'string' },		//NCT
		{	name: 'wkct_3'			, type: 'string' },		//LASER
		{	name: 'wkct_4'			, type: 'string' },		//사상
		{	name: 'wkct_5'			, type: 'string' },		//드릴
		{	name: 'wkct_6'			, type: 'string' },		//C/S
		{	name: 'wkct_7'			, type: 'string' },		//TAP
		{	name: 'wkct_8'			, type: 'string' },		//절곡1
		{	name: 'wkct_9'			, type: 'string' },		//절곡2
		{	name: 'wkct_10'			, type: 'string' },		//용접
		{	name: 'wkct_11'			, type: 'string' },		//외주가공
		{	name: 'wkct_12'			, type: 'string' },		//도금
		{	name: 'wkct_13'			, type: 'string' },		//도장
		{	name: 'wkct_14'			, type: 'string' },		//폴리싱
		{	name: 'wkct_15'			, type: 'string' },		//전해연마
		{	name: 'wkct_16'			, type: 'string' },		//인쇄
		{	name: 'wkct_17'			, type: 'string' },		//조립
		{	name: 'wkct_18'			, type: 'string' },		//세척
		{	name: 'wkct_19'			, type: 'string' },		//검사
		{	name: 'wkct_20'			, type: 'string' },		//납품

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

