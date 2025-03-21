Ext.define('module.membership.inout.lssnschdtoday.view.LssnSchdTodayLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lssnschdtoday-lister'			,
	store		: 'module.membership.inout.lssnschdtoday.store.LssnSchdToday'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
//	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}, { ptype:'filterbar'}],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		console.log(_global.hq_id);
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
//					{	xtype   : 'button',
//						iconCls : 'filterIcon',
//						toggleGroup:'onoff',
//						listeners:{
//							toggle:function(toggle){
//								var filter = me.filterBar;
//									filter.setVisible(toggle.pressed);
//							}
//						}
//					},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'drtr_name'		, width: 120, align : 'center'	, text: Language.get('resv_time'	, '코치'		)
					},{	dataIndex:	'resv_time'		, width:  80, align : 'center'	, text: Language.get('resv_time'	, '시간'		)
					},{	dataIndex:	'aa'			, flex :   1, align : 'left'	, text: Language.get('aa'			, '회원명'	)
					}
				]
			}
		;
		return item;
	}
});
