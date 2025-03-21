Ext.define('module.custom.hantop.item.bommast.model.BomMastDetail4',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'wdtp_idcd',			type: 'string'},		//브랜드분류코드
		{	name: 'wdtp_code',			type: 'string'},		//창호모델ID
		{	name: 'wdtp_name',			type: 'string'},		//창호그룹ID
		{	name: 'wdcl_idcd',			type: 'string'},		//창호모델코드
		{	name: 'wdgr_idcd',			type: 'string'},		//모델명
		{	name: 'wdcl_name',			type: 'string'},		//제품군분류코드
		{	name: 'imge_1fst',			type: 'string'},		//창호규격
		{	name: 'imge_2snd',			type: 'string'},		//BF품목ID
		{	name: 'imge_3trd',			type: 'string'},		//SF품목ID
		{	name: 'imge_4frt',			type: 'string'},		//BF폭
		{	name: 'imge_5fit',			type: 'string'},		//SF폭
		{	name: 'imge_6six',			type: 'string'},		//MC품목ID
		{	name: 'imge_7svn',			type: 'string'},		//MF품목ID

		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},	//ROW레벨
		{	name: 'line_ordr',			type: 'float'  , defaultValue: '0'},	//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},	//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string' , convert : Ext.util.Format.strToDateTime},	//수정일시
		{	name: 'updt_idcd',			type: 'string' , defaultValue: _global.login_pk},			//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string' , convert : Ext.util.Format.strToDateTime},	//생성일시
		{	name: 'crte_idcd',			type: 'string' , defaultValue: _global.login_pk},			//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
	]
});
