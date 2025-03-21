Ext.define('module.qc.anal.insplist2.model.InspList2Lister2', { extend: 'Axt.data.Model',
	fields:
		[
			{	name: 'invc_numb',			type: 'string' },		//INVOICE번호
			{	name: 'wkct_code',			type: 'string' },		//공정코드
			{	name: 'invc_date',			type: 'string' ,/*defaultValue : Ext.Date.format(new Date(),'Ymd'),*/ convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },    //INVOICE일자수
			{	name: 'wkct_idcd',			type: 'string' },		//공정ID
			{	name: 'wker_idcd',			type: 'string'},
			{	name: 'wkct_name',			type: 'string' },		//공정명
			{	name: 'poor_type_name',		type: 'string' },		//불량유형명
			{	name: 'user_name',			type: 'string' },		//담당자명
			{	name: 'poor_qntt',			type: 'float'  },		//불량수량
			{	name: 'line_stat'			, type: 'string' , defaultValue: '0'},		//ROW상태
			{	name: 'line_clos'			, type: 'string' },		//ROW마감
		]
});