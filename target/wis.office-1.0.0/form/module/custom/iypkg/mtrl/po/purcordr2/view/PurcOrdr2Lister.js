Ext.define('module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr2-lister',
	store		: 'module.custom.iypkg.mtrl.po.purcordr2.store.PurcOrdr2',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 } , { ptype:'gridcolumnconfig' } ],
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
				xtype	: 'grid-paging',
				items	: [
					'->', '-',
					{	text : '<span class="write-button">발주서 발행</span>', action : 'writeAction'  , cls: 'button1-style'	},
					'-', '-',
					{	text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style' },
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style'	},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'발주번호'		) , width : 170 , align : 'center'
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'			) , width :  45 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'발주일자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 150 , align : 'left'
					},{ dataIndex: 'asmt_code'		, text : Language.get('asmt_code'		,'부자재코드'	) , width : 100 , align : 'center'
					},{ dataIndex: 'asmt_name'		, text : Language.get('asmt_name'		,'부자재명'		) , width : 160 , align : 'left' ,
					 	/*tdCls	: 'editingcolumn',
						editor	: {
							xtype : 'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										 var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[7]);
									}
								}
							}
						}*/
					},{ dataIndex: 'asmt_spec'		, text : Language.get('asmt_spec'		,'규격'			) , width : 100 , align : 'center', hidden : _global.hq_id.toUpperCase() == 'N1000IYPKG' ? false : true,
					},{ dataIndex: 'asmt_dvcd'		, text : Language.get('asmt_dvcd'		,'구분'			) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('asmt_dvcd')
					},{	dataIndex: 'offr_qntt'		, text : Language.get('offr_qntt'		,'발주수량'		) , width :  80 , align : 'right' , xtype: 'numericcolumn',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[9]);
									}
								}
							}
						}
					},{	dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width :  80 , align : 'center'
					},{ dataIndex: 'offr_pric'		, text : Language.get('offr_pric'		,'단가'		) , width :  80 , align : 'right' , xtype: 'numericcolumn',
					tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'		) , width : 200 , align : 'center'
					},{ dataIndex: 'acpt_cstm_name'	, text : Language.get('cstm_name'		,'수주처명'		) , width : 150 , align : 'left'
					},{ dataIndex: 'prod_name'		, text : Language.get('prod_name'		,'제품명'		) , width : 150 , align : 'left',
					}
				]
			}
		;
		return item;
	}
});