Ext.define('module.basic.systemoption.view.SystemOptionLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-systemoption-lister'			,
	store		: 'module.basic.systemoption.store.SystemOption'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="write-button">환경초기화</span>', action : 'resetAction', cls: 'button1-style'	},
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center', align : 'center'},
				items : [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'사용'		)	, width :  50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'prjt_idcd'		, text : Language.get('prjt_idcd'		,'프로젝트ID'	)	, width : 150	, hidden : true
					},{ dataIndex: 'hqof_idcd'		, text : Language.get('hqof_idcd'		,'본사ID'		)	, width : 150	, hidden : true
					},{ dataIndex: 'optn_idcd'		, text : Language.get('optn_idcd'		,'옵션ID'		)	, width : 150
					},{ dataIndex: 'optn_name'		, text : Language.get('optn_name'		,'옵션명'		)	, width : 200	, align : 'left'
					},{ dataIndex: 'clss_1fst'		, text : Language.get('clss_1fst'		,'분류1'		)	, width : 100	, align : 'left'
					},{ dataIndex: 'clss_2snd'		, text : Language.get('clss_2snd'		,'분류2'		)	, width : 100	, align : 'left'
					},{ dataIndex: 'clss_3trd'		, text : Language.get('clss_3trd'		,'분류3'		)	, width : 100	, align : 'left'
					},{ dataIndex: 'optn_desc'		, text : Language.get('optn_desc'		,'옵션설명'		)	, width : 500	, align : 'left'
					},{ dataIndex: 'sysm_optn_dvcd'	, text : Language.get('sysm_optn_dvcd'	,'옵션구분'		)	, width : 100	, xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'sysm_optn_dvcd' )
					},{ dataIndex: 'optn_logc_valu'	, text : Language.get('optn_logc_valu'	,'논리값'		)	, width :  90	, xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'optn_yorn_valu'	, text : Language.get('optn_yorn_valu'	,'여부값'		)	, width :  60	, xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'optn_nmbr_valu'	, text : Language.get('optn_nmbr_valu'	,'숫자값'		)	, width :  90	, align : 'right', xtype : 'numericcolumn',
					},{ dataIndex: 'optn_char_valu'	, text : Language.get('optn_char_valu'	,'문자값'		)	, width : 120	, align : 'left'
					},{ dataIndex: 'optn_scpe_from'	, text : Language.get('optn_scpe_from'	,'범위부터'		)	, width : 100	, align : 'right', xtype : 'numericcolumn',
					},{ dataIndex: 'optn_scpe_util'	, text : Language.get('optn_scpe_util'	,'범위까지'		)	, width : 100	, align : 'right', xtype : 'numericcolumn',
					},{ dataIndex: 'optn_etcc'		, text : Language.get('optn_etcc'		,'옵션기타'		)	, width : 100	, align : 'left'
					},{ dataIndex: 'code_idcd'		, text : Language.get('code_idcd'		,'코드ID'		)	, width : 100	, hidden : true
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		)	, flex  : 100	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});