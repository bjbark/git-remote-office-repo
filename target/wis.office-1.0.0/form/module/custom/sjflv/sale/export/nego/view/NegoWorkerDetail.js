Ext.define('module.custom.sjflv.sale.export.nego.view.NegoWorkerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-nego-worker-detail',
	store		: 'module.custom.sjflv.sale.export.nego.store.NegoWorkerDetail',

	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me = this;
//		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{ dataIndex: 'invc_numb'		, text : Language.get(''		,'항번'		) , width : 60  , xtype : 'numericcolumn'
					},{	dataIndex: 'item_hscd'		, text : Language.get(''		,'HS Code'	) , width : 120 , align : 'center'
					},{	dataIndex: 'item_idcd'		, text : Language.get(''		,'품목코드'	) , width : 100 , align : 'center'
					},{	dataIndex: 'item_idcd'		, text : Language.get(''		,'품명'		) , width : 160 , align : 'center'
					},{	dataIndex: 'unit_idcd'		, text : Language.get(''		,'규격'		) , width : 160 , align : 'center'
					},{ dataIndex: 'unit_idcd'		, text : Language.get(''		,'단위'		) , width : 70
					},{ dataIndex: 'qntt'			, text : Language.get(''		,'수량'		) , width : 80   , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'exch_pric'		, text : Language.get(''		,'판매단가'	) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'krwn_pric'		, text : Language.get(''		,'판매금액'	) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'krwn_pric'		, text : Language.get(''		,'원화단가'	) , width : 100  , xtype : 'numericcolumn'
					},{ dataIndex: 'krwn_amnt'		, text : Language.get(''		,'원화금액'	) , width : 100  , xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	},

});
