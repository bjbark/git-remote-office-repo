Ext.define('module.mtrl.po.purcstokwork.view.PurcStokWorkLister', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purcstokwork-lister',
	store	: 'module.mtrl.po.purcstokwork.store.PurcStokWorkLister',
	selModel: { selType: 'checkboxmodel', mode : 'MULTI',
		listeners : {
			select : function(rowmodel, record) {
				if(record.get('rqst_offr_qntt') == '0'){
					record.set('rqst_offr_qntt', -record.get('lack_offr_qntt'));
				}
			}
		}
	},
	plugins	: [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var rowIndexNum;
		var me = this;
		me.paging	= me.pagingItem();
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
				xtype	: 'toolbar', dock : 'bottom',
				items	: [
					'->', '-',
					{	text : '<span class="write-button">발주요청</span>', action : 'orderAction', cls: 'button1-style'		},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_idcd'		, text : Language.get('item_idcd'		,'발주수량'		) ,hidden:true
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 200 , align : 'left'
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 230 , align : 'left'
					},{	dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width : 80  , align : 'center'
					},{	dataIndex: 'safe_stok'		, text : Language.get('safe_stok'		,'안전재고'		) , width : 150 , align : 'right', textCls : 'red'
					},{	dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'		,'현재고'		) , width : 150 , xtype : 'numericcolumn', align : 'right'
					},{	dataIndex: 'offr_qntt'		, text : Language.get('offr_qntt'		,'발주수량'		) , width : 150 , xtype : 'numericcolumn', align : 'right'
					},{	dataIndex: 'dlvy_qntt'		, text : Language.get('dlvy_qntt'		,'입고수량'		) , width : 150 , xtype : 'numericcolumn', align : 'right'
					},{	dataIndex: 'offr_rmin_qntt'	, text : Language.get('offr_rmin_qntt'	,'발주잔량'		) , width : 150 , xtype : 'numericcolumn', align : 'right'
					},{	dataIndex: 'lack_offr_qntt'	, text : Language.get('lack_offr_qntt'	,'과부족 수량'	) , width : 150 , xtype : 'numericcolumn', align : 'right'
					},{	dataIndex: 'rqst_offr_qntt'	, text : Language.get(''				,'발주필요수량'	) , flex  : 1   , xtype : 'numericcolumn', align : 'right',
						tdCls  : 'editingcolumn',
						editor : {
							xtype : 'numericfield',
							enableKeyEvents : true,
							listeners : {
								change : function(value) {
									var grid = this.up('grid'),
										rqst_offr_qntt = grid.down('[name=rqst_offr_qntt]').getValue();
									if(rqst_offr_qntt == null){
										grid.down('[name=rqst_offr_qntt]').setValue('0');
									}
								}
							}
						}
					}
				]
			}
		;
		return item;
	}
});