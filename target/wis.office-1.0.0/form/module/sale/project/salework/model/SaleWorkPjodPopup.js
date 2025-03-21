Ext.define('module.sale.project.salework.model.SaleWorkPjodPopup',{ extend:'Axt.data.Model',
	fields:[
		{name: 'pjod_idcd',				type: 'string'},		//프로젝트수주id
		{name: 'amnd_degr',				type: 'float' },		//AMD차수
		{name: 'pjod_code',				type: 'string'},		//프로젝트수주코드
		{name: 'pjod_dvcd',				type: 'string'},		//프로젝트수주구분코드
		{name: 'expt_dvcd',				type: 'string'},		//수출구분코드
		{name: 'cstm_idcd',				type: 'string'},		//거래처ID
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'prjt_idcd',				type: 'string'},		//프로젝트ID
		{name: 'pjod_name',				type: 'string'},		//프로젝트수주명
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'item_code',				type: 'string'},		//금형코드
		{name: 'item_name',				type: 'string'},		//금형명
		{name: 'item_spec',				type: 'string'},		//규격
		{name: 'modl_name',				type: 'string'},		//모델명
		{name: 'esti_amnt',				type: 'float' },		//견적금액
		{name: 'cofm_yorn',				type: 'string'},		//확정여부
		{name: 'cofm_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//확정일자
		{name: 'cofm_amnt',				type: 'float' },		//확정금액
		{name: 'crny_dvcd',				type: 'string'},		//통화구분코드
		{name: 'frst_exam_date',		type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//1차시험일자
		{name: 'send_exam_date',		type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//2차시험일자
		{name: 'deli_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납기일자
		{name: 'ppsl_deli_date',		type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//제안납기일자
		{name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{name: 'drtr_name',				type: 'string'},		//담당자명
		{name: 'dlvy_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납품일자
		{name: 'last_yorn',				type: 'string'},		//최종여부
		{name: 'apvl_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//승인일자
		{name: 'apvl_drtr_idcd',		type: 'string'},		//승인담당자ID
		{name: 'cstm_item_code',		type: 'string'},		//고객품목코드
		{name: 'mold_size',				type: 'float' },		//금형크기
		{name: 'cavity',				type: 'string'},		//CAVITY
		{name: 'mold_wigt',				type: 'float' },		//금형중량
		{name: 'used_mtrl_name',		type: 'string'},		//사용재료명
		{name: 'prod_wigt',				type: 'float' },		//제품중량
		{name: 'used_tons',				type: 'float' },		//사용톤수
		{name: 'regi_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//등록일자
		{name: 'strt_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//시작일자
		{name: 'endd_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//시작일자
		{name: 'item_imge',				type: 'string'} ,		//이미지(blob)
		{name: 'item_imge2',			type: 'string'} ,		//이미지2(blob)



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
