Ext.define('module.membership.inout.lssnschd.view.LssnSchdLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lssnschd-lister'			,
	store		: 'module.membership.inout.lssnschd.store.LssnSchd'	,
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
					{	dataIndex:	'resv_time'			, width:  70, align : 'center'	, text: Language.get('resv_time'		, '시간'			)
					},{	dataIndex:	'aa'	, width:  70, align : 'center'	, text: Language.get('aa'		, '1일'	)
					},{	dataIndex:	'aa'	, width:  70, align : 'center'	, text: Language.get('aa'		, '1일'	)
					},{	dataIndex:	'ab'	, width:  70, align : 'center'	, text: Language.get('aa'		, '2일'	)
					},{	dataIndex:	'ac'	, width:  70, align : 'center'	, text: Language.get('aa'		, '3일'	)
					},{	dataIndex:	'ad'	, width:  70, align : 'center'	, text: Language.get('aa'		, '4일'	)
					},{	dataIndex:	'ae'	, width:  70, align : 'center'	, text: Language.get('aa'		, '5일'	)
					},{	dataIndex:	'af'	, width:  70, align : 'center'	, text: Language.get('aa'		, '6일'	)
					},{	dataIndex:	'ag'	, width:  70, align : 'center'	, text: Language.get('aa'		, '7일'	)
					},{	dataIndex:	'ah'	, width:  70, align : 'center'	, text: Language.get('aa'		, '8일'	)
					},{	dataIndex:	'ai'	, width:  70, align : 'center'	, text: Language.get('aa'		, '9일'	)
					},{	dataIndex:	'aj'	, width:  70, align : 'center'	, text: Language.get('aa'		, '10일'	)
					},{	dataIndex:	'ba'	, width:  70, align : 'center'	, text: Language.get('aa'		, '11일'	)
					},{	dataIndex:	'bb'	, width:  70, align : 'center'	, text: Language.get('aa'		, '12일'	)
					},{	dataIndex:	'bc'	, width:  70, align : 'center'	, text: Language.get('aa'		, '13일'	)
					},{	dataIndex:	'bd'	, width:  70, align : 'center'	, text: Language.get('aa'		, '14일'	)
					},{	dataIndex:	'be'	, width:  70, align : 'center'	, text: Language.get('aa'		, '15일'	)
					},{	dataIndex:	'bf'	, width:  70, align : 'center'	, text: Language.get('aa'		, '16일'	)
					},{	dataIndex:	'bg'	, width:  70, align : 'center'	, text: Language.get('aa'		, '17일'	)
					},{	dataIndex:	'bh'	, width:  70, align : 'center'	, text: Language.get('aa'		, '18일'	)
					},{	dataIndex:	'bi'	, width:  70, align : 'center'	, text: Language.get('aa'		, '19일'	)
					},{	dataIndex:	'bj'	, width:  70, align : 'center'	, text: Language.get('aa'		, '20일'	)
					},{	dataIndex:	'ca'	, width:  70, align : 'center'	, text: Language.get('aa'		, '21일'	)
					},{	dataIndex:	'cb'	, width:  70, align : 'center'	, text: Language.get('aa'		, '22일'	)
					},{	dataIndex:	'cc'	, width:  70, align : 'center'	, text: Language.get('aa'		, '23일'	)
					},{	dataIndex:	'cd'	, width:  70, align : 'center'	, text: Language.get('aa'		, '24일'	)
					},{	dataIndex:	'ce'	, width:  70, align : 'center'	, text: Language.get('aa'		, '25일'	)
					},{	dataIndex:	'cf'	, width:  70, align : 'center'	, text: Language.get('aa'		, '26일'	)
					},{	dataIndex:	'cg'	, width:  70, align : 'center'	, text: Language.get('aa'		, '27일'	)
					},{	dataIndex:	'ch'	, width:  70, align : 'center'	, text: Language.get('aa'		, '28일'	)
					},{	dataIndex:	'ci'	, width:  70, align : 'center'	, text: Language.get('aa'		, '29일'	)
					},{	dataIndex:	'cj'	, width:  70, align : 'center'	, text: Language.get('aa'		, '30일'	)
					},{	dataIndex:	'ck'	, width:  70, align : 'center'	, text: Language.get('aa'		, '31일'	)
					}
				]
			}
		;
		return item;
	}
});
