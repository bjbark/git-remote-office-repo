Ext.define('module.qc.anal.insplist2.model.InspList2Lister', { extend: 'Axt.data.Model',
	fields:
		[
	  		{	name: 'invc_numb',			type: 'string'},		//INVOICE번호
	  		{	name: 'line_seqn',			type: 'string'},		//순번
	  		{	name: 'invc_date',			type: 'string' ,defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },    //INVOICE일자수
	  		{	name: 'poor_bacd',			type: 'string' },		//불량유형코드
//	  		{	name: 'crty_bacd',			type: 'string' },		//차종코드
	  		{ 	name: 'poor_proc_dvcd',		type: 'float' },		//불량 처리 구분
	  		{	name: 'wkct_idcd',			type: 'string' },		//공정ID
	  		{	name: 'wkct_name',			type: 'string'},		//공정명
	  		{	name: 'cstm_name',			type: 'string' },		//거래처명
	  		{	name: 'modl_name',			type: 'string' },		//모델명
	  		{	name: 'acpt_numb',			type: 'string' },		//수주번호
	  		{	name: 'acpt_seqn',			type: 'float'  },		//수주순번
	  		{	name: 'cvic_name',			type: 'string'},		//설비명
	  		{	name: 'item_name',			type: 'string'},		//품명
	  		{	name: 'item_spec',			type: 'string'},		//규격
	  		{	name: 'prod_qntt',			type: 'float'  },		//생산수량
	  		{	name: 'user_name',			type: 'string'},		//생산담당자
	  		{	name: 'drtr_idcd',			type: 'string'},		//생산담당자
	  		{	name: 'prod_qntt',			type: 'float'  },
	  		{	name: 'poor_name',		type: 'string' },		//불량유형명
	  		{	name: 'poor_caus_bacd',		type: 'string'},		//불량유형  체크
	  		{	name: 'poor_qntt',			type: 'float' },		//불량수량 체크
	  		{	name: 'indn_qntt',			type: 'float' },		//지시수량 체크
	  		{	name: 'sttm',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//작업시작일시
	  		{	name: 'edtm',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//작업종료일시
//			{	name: 'insp_dvcd'			, type: 'string' , defaultValue: '0'},	//검사구분코드
			{	name: 'item_idcd'			, type: 'string' },		//품목ID
			{	name: 'wkct_item_idcd'		, type: 'string' },		//공정품목ID
			{	name: 'line_stat'			, type: 'string' , defaultValue: '0'},		//ROW상태
			{	name: 'line_clos'			, type: 'string' },		//ROW마감
			{	name: 'find_name'			, type: 'string' },		//찾기명
		]
});