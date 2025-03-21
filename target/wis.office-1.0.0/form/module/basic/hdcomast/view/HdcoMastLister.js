Ext.define('module.basic.hdcomast.view.HdcoMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-hdcomast-lister'			,
	store		: 'module.basic.hdcomast.store.HdcoMast'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
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
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')		, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'hdco_dvcd'		, text : Language.get('hdco_dvcd'		,'택배사코드')	, width : 90  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('hdco_dvcd'), align : 'center'
					},{ dataIndex: 'hdco_name'		, text : Language.get('hdco_name'		,'본사명')		, width : 150  , align : 'left'
					},{ dataIndex: 'brch_name'		, text : Language.get('brch_name'		,'지점명')		, width : 150 , align : 'left'
					},{ dataIndex: 'tele_numb'		, text : Language.get('tele_numb'		,'전화번호')	, width : 90 , align : 'right'
					},{ dataIndex: 'hdph_numb'		, text : Language.get('hdph_numb'		,'휴대폰번호')	, width : 90 , align : 'right'
					},{ dataIndex: 'boss_name'		, text : Language.get('boss_name'		,'대표자명')	, width : 100 , align : 'left'
					},{ dataIndex: 'post_code'		, text : Language.get('post_code'		,'우편번호')	, width : 80 , align : 'left'
					},{	dataIndex: 'addr_1fst'		, text : Language.get('addr_1fst'		, '주소'	)	,width: 200, align : 'left',
					},{	dataIndex: 'addr_2snd'		, text : Language.get('addr_2snd'		, '상세주소')	,width: 150, align : 'left',
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고')		, flex  : 50
					}
				]
			}
		;
		return item;
	}
});
