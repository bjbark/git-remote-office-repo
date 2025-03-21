Ext.define('module.qc.project.remklist.model.RemkListMaster2',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'pjod_idcd',				type: 'string'},		//프로젝트수주ID
		{	name: 'line_seqn',				type: 'float' },		//순번
		{	name: 'regi_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//등록일자
		{	name: 'wkct_idcd',				type: 'string'},		//공정ID
		{	name: 'wkct_name',				type: 'string'},		//공정명
		{	name: 'cvic_idcd',				type: 'string'},		//설비ID
		{	name: 'cvic_name',				type: 'string'},		//설비명
		{	name: 'prod_qntt',				type: 'float' },		//생산수량
		{	name: 'poor_qntt',				type: 'float' },		//불량수량
		{	name: 'pass_qntt',				type: 'float' },		//합격수량
		{	name: 'loss_rate',				type: 'float' },		//loss율
		{	name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{	name: 'drtr_name',				type: 'string'},		//당당자명
		{	name: 'sttm',					type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr } ,		//시작시간
		{	name: 'sttm1',					type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr } ,		//시작시간
		{	name: 'sttm2',					type: 'string' , defaultValue : '00:00'},		//시작시간
		{	name: 'edtm',					type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr } ,		//종료시간
		{	name: 'edtm1',					type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr } ,		//종료시간
		{	name: 'edtm2',					type: 'string' , defaultValue : '00:00'},		//종료시간
		{	name: 'uper_seqn',				type: 'float' },		//상위순번
		{	name: 'disp_seqn',				type: 'float' },		//표시순번
		{	name: 'item_name',				type: 'string'},		//금형명
		{	name: 'user_memo',				type: 'string'},		//사용자메모
		{	name: 'sysm_memo',				type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',				type: 'string'},		//부모ID
		{	name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',				type: 'string'},		//ROW순서
		{	name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',				type: 'string'},		//ROW마감
		{	name: 'find_name',				type: 'string'},		//찾기명
		{	name: 'updt_user_name',			type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',				type: 'string'},		//수정IP
		{	name: 'updt_dttm',				type: 'string'},		//수정일시
		{	name: 'updt_idcd',				type: 'string'},		//수정ID
		{	name: 'updt_urif',				type: 'string'},		//수정UI
		{	name: 'crte_user_name',			type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',				type: 'string'},		//생성IP
		{	name: 'crte_dttm',				type: 'string'},		//생성일시
		{	name: 'crte_idcd',				type: 'string'},		//생성ID
		{	name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
