Ext.define('module.qc.project.remkwork.model.RemkWorkDetail',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'pjod_idcd',				type: 'string'},		//프로젝트수주ID
		{	name: 'line_seqn',				type: 'float' },		//순번
		{	name: 'poor_seqn',				type: 'float' },		//불량순번
		{	name: 'prod_qntt',				type: 'float' },		//생산수량
		{	name: 'poor_qntt',				type: 'float' },		//불량수량
		{	name: 'poor_bacd',				type: 'string'},		//불량유형구분코드
		{	name: 'poor_name',				type: 'string'},		//불량유형명
		{	name: 'poor_cont',				type: 'string'},		//불량내용
		{	name: 'trtm_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//조치일자
		{	name: 'trtm_cont',				type: 'string'},		//조치내용
		{	name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{	name: 'drtr_name',				type: 'string'},		//담당자명
		{	name: 'imge_1fst',				type: 'string'},		//이미지1
		{	name: 'imge_2snd',				type: 'string'},		//이미지2

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
		{	name: 'imge_chek1',				type: 'string'},		//이미지체크1
		{	name: 'imge_chek2',				type: 'string'},		//이미지체크2
	]
});