Ext.define('module.custom.wontc.prod.order.workentry.model.WorkEntryDetail', { extend:'Axt.data.Model',
	fields: [
		{	name: 'prog_stat_dvcd'			, type: 'string' },		//상태
		{	name: 'invc_numb'				, type: 'string' },		//작업지시번호
		{	name: 'line_seqn'				, type: 'float'  },		//작업지시순번
		{	name: 'invc_qntt'				, type: 'float'  },		//수주량
		{	name: 'cstm_idcd'				, type: 'string' },		//거래처ID
		{	name: 'cstm_name'				, type: 'string' },		//거래처명
		{	name: 'item_idcd'				, type: 'string' },		//품목ID
		{	name: 'item_name'				, type: 'string' },		//품목명
		{	name: 'indn_qntt'				, type: 'float'  },		//지시수량
		{	name: 'drwg_numb'				, type: 'string' },		//도면번호
		{	name: 'revs_numb'				, type: 'string' },		//리비젼번호
		{	name: 'acpt_case_name'			, type: 'string' },		//모델명
		{	name: 'wkct_idcd'				, type: 'string' },		//공정ID
		{	name: 'wkct_name'				, type: 'string' },		//공정명
		{	name: 'wkfw_seqn'				, type: 'float'  },		//공정순서
		{	name: 'user_name'				, type: 'string' },		//작업자
		{	name: 'work_date'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//작업일자

		//work_book
		{	name: 'new_invc_numb'	, type: 'string' },		//INVOICE번호
		{	name: 'invc_date'		, type: 'string' },		//INVOICE날짜
		{	name: 'wkct_idcd'		, type: 'string' },		//공정ID
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

