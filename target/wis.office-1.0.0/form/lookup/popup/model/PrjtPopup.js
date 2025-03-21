Ext.define('lookup.popup.model.PrjtPopup',{ extend:'Axt.data.Model',
	fields:[
		{name: 'prjt_idcd',				type: 'string'},		//프로젝트id
		{name: 'prjt_code',				type: 'string'},		//프로젝트코드
		{name: 'prjt_name',				type: 'string'},		//프로젝트명
		{name: 'cstm_idcd',				type: 'string'},		//거래처id
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'cstm_code',				type: 'string'},		//거래처명
		{name: 'regi_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//등록일자
		{name: 'item_idcd',				type: 'string'},		//품목id
		{name: 'item_code',				type: 'string'},		//품목id
		{name: 'item_name',				type: 'string'},		//품명
		{name: 'item_spec',				type: 'string'},		//품목규격
		{name: 'modl_name',				type: 'string'},		//모델명
		{name: 'regi_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//등록일자
		{name: 'strt_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//시작일자
		{name: 'endd_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//종료일자
		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
