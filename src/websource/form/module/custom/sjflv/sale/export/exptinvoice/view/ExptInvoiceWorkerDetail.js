Ext.define('module.custom.sjflv.sale.export.exptinvoice.view.ExptInvoiceWorkerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-exptinvoice-worker-detail',
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
					{ dataIndex: 'trst_qntt'		, text : Language.get(''		,'항번'		) , width : 60  , xtype : 'numericcolumn'
					},{	dataIndex: 'new_invc_numb'	, text : Language.get(''		,'품목코드'	) , width : 100 , align : 'center'
					},{	dataIndex: 'new_line_seqn'	, text : Language.get(''		,'품명'		) , width : 160 , align : 'center'
					},{	dataIndex: 'deli_date'		, text : Language.get(''		,'규격'		) , width : 160 , align : 'center'
					},{	dataIndex: 'acpt_numb'		, text : Language.get(''		,'HS Code'	) , width : 120 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get(''		,'단위'		) , width : 70
					},{ dataIndex: 'ostt_qntt'		, text : Language.get(''		,'수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'exch_pric'		, text : Language.get(''		,'단가'		) , width : 100  , xtype : 'numericcolumn'
					},{ dataIndex: 'unpaid'			, text : Language.get(''		,'금액'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt2'		, text : Language.get(''		,'원화단가'	) , width : 100  , xtype : 'numericcolumn'
					},{ dataIndex: 'ostt_qntt2'		, text : Language.get(''		,'원화금액'	) , width : 100  , xtype : 'numericcolumn'
					},{ dataIndex: 'ostt_qntt2'		, text : Language.get(''		,'Maker'	) , width : 100
					},{ dataIndex: 'ostt_qntt2'		, text : Language.get(''		,'선적예정일'	) , width : 100
					},{ dataIndex: 'ostt_qntt2'		, text : Language.get(''		,'비고'		) , flex  :   1 , minWidth : 200
					}
				]
			}
		;
		return item;
	},

});
