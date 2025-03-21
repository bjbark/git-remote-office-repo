Ext.define('module.custom.komec.prod.workbook.model.WorkBookLastEndPopup',{ extend:'Axt.data.Model',
	fields: [
				{	name: 'invc_numb' 			,  type: 'string'},		//INVOICE번호
				{	name: 'lott_numb' 			,  type: 'string'},		//INVOICE일자
				{	name: 'wkod_numb' 			,  type: 'string'},		//INVOICE일자
				{	name: 'wkod_seqn' 			,  type: 'float '},		//INVOICE일자
				{	name: 'invc_date' 			,  type: 'string'},		//INVOICE일자
				{	name: 'work_strt_dttm' 		,  type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr}, 	//작업시작일시
				{	name: 'work_endd_dttm' 		,  type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr}, 	//작업종류일시
				{	name: 'prod_qntt' 			,  type: 'float' },		//수량
				{	name: 'qntt' 				,  type: 'float' },		//수량

				{	name: 'sysm_memo'			,  type: 'string' },		//시스템메모
				{	name: 'prnt_idcd'			,  type: 'string' },		//부모ID
				{	name: 'line_levl'			,  type: 'float'  , defaultValue: '0'},	//ROW레벨
				{	name: 'line_ordr'			,  type: 'float'  },		//ROW순서
				{	name: 'line_stat'			,  type: 'string' , defaultValue: '0'},	//ROW상태
				{	name: 'line_clos'			,  type: 'string' , defaultValue: '0'},	//ROW마감
				{	name: 'find_name'			,  type: 'string' },		//찾기명
				{	name: 'updt_user_name'		,  type: 'string' },		//수정사용자명
				{	name: 'updt_ipad'			,  type: 'string' },		//수정IP
				{	name: 'updt_dttm'			,  type: 'string' , defaultValue: Ext.Date.format(new Date(),'Ymd')},		//수정일시
				{	name: 'updt_idcd'			,  type: 'string' , defaultValue:_global.login_pk },		//수정ID
				{	name: 'updt_urif'			,  type: 'string' },		//수정UI
				{	name: 'crte_user_name'		,  type: 'string' },		//생성사용자명
				{	name: 'crte_ipad'			,  type: 'string' },		//생성IP
				{	name: 'crte_dttm'			,  type: 'string' },		//생성일시
				{	name: 'crte_idcd'			,  type: 'string' },		//생성ID
				{	name: 'crte_urif'			,  type: 'string' },		//생성UI
			]
	});

