/**
 * 공용 조회조건(자료상태(row_sts))
 *
 * 사용 방법
Controller 내 requires 부문에
		'module.common.view.SearchRowStatus'
Editor에서
		{	xtype	: 'module-common-search-rowstatus'
		}
 */

Ext.define('module.common.view.SearchRowStatus', {  extend:'Axt.form.Panel'
	,xtype	: 'module-common-search-rowstatus'
	,height	: 20
	,style	: 'padding-top : 0;padding-bottom : 0;padding-left : 0;padding-right : 0'
	,border	: 0
	,items	: [
		{	xtype	: 'fieldset'
			,border	: 0
			,style	: { borderColor	: '#263c63', borderStyle	: 'solid',background: '#dee8f4' }
			,flex	: 1
			,layout	: 'hbox'
			,items	: [
				{	fieldLabel	: Language.get('line_stat' , '사용여부')
					,xtype		: 'lookupfield'
					,name		: 'line_stat'
					,editable	: false
					,lookupValue: resource.getList('search_all').concat( resource.getList('line_stat' ) )
					,value		: '0'
				}
			]
		}
	]
});