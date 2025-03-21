Ext.define('module.membership.basic.memberlist.model.MemberListMemo', { extend:'Axt.data.Model',
	fields: [
		{	name: 'mmbr_idcd'			, type: 'string' },		//품목ID
		{	name: 'line_seqn'			, type: 'float'  },		//순번
		{	name: 'scrt_dvcd'			, type: 'string' },		//구분
		{	name: 'memo_dttm'			, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd') , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: 'memo_dvcd'			, type: 'string' },
		{	name: 'dwup_empy_idcd'		, type: 'string' },		//담당자ID
		{	name: 'dwup_empy_name'		, type: 'string' },		//담당자ID
		{	name: 'ttle'				, type: 'string' },		//메모구분
		{	name: 'memo_1fst'			, type: 'string' },		//메모내용
		{	name: 'memo_2snd'			, type: 'string' },		//메모내용
		{	name: 'memo_3trd'			, type: 'string' },		//메모내용
		{	name: 'memo_4frt'			, type: 'string' },		//메모내용
		{	name: 'dwup_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd') , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: 'dwup_time'			, type: 'string' , defaultValue : '00'},
		{	name: 'modify'				, type: 'string' },		//chk'			, type: 'string' },		//메모내용
	]
});

