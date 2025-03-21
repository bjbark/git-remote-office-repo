Ext.define('module.custom.nbolt.eis.project.eisreport.view.EisReportLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport-lister',
	store		: 'module.custom.nbolt.eis.project.eisreport.store.EisReport',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }, { ptype:'filterbar'},{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],

	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar', dock : 'bottom',
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'isoslist',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'->', '-' ,
					{ text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	xtype: 'rownumberer'			, width:  50, text: '순번', align : 'center'
					},{	dataIndex:	'item_clss_bacd_name', width: 200, align : 'left'	, text: Language.get( 'item_clss_bacd_name'	, '품목군'	)
					},{	dataIndex:	'item_code'			, width: 100, align : 'center'	, text: Language.get('item_code'		, '품목코드'		)
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'	, text: Language.get( 'item_name'		, '품명'			)
					},{	dataIndex:	'item_spec'			, width: 200, align : 'left'	, text: Language.get( 'item_spec'		, '품목규격'		)
					},{	dataIndex:	'drwg_numb'			, width: 100, align : 'left'	, text: Language.get( 'drwg_numb'		, '도면번호'		)
					},{	dataIndex:	''			, width: 100, align : 'left'	, text: Language.get( ''		, '작업지시번호'		)
					},{ dataIndex: 'indn_qntt'			, text : Language.get('indn_qntt'		,'지시수량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'prod_qntt'			, text : Language.get('prod_qntt'		,'생산수량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''			, text : Language.get(''		,'출하수량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex: 'cstm_name'			, width: 200, align : 'left'	, text: Language.get( ''		, '거래처명'		)
					},{	dataIndex: ''			, width: 110, align : 'left'	, text: Language.get( ''		, '반재절단'		)
					},{	dataIndex: ''			, width: 110, align : 'left'	, text: Language.get( ''		, '나사연삭'		)
					},{	dataIndex: ''			, width: 110, align : 'left'	, text: Language.get( ''		, '포장'		)
					}
				]
			}
		;
		return item;
	}
});