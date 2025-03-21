Ext.define('module.custom.sjflv.prod.prodbomlist.view.ProdBomListLister4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-prodbomlist-lister4',
	store		: 'module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister4',
	border		: 0,
	title		: Language.get('item','제품'),
	columnLines	: true,

	//selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 }, { ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
		item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{ text : '<span class="write-button">계산</span>', action : 'calBOMAction'	, cls: 'button-style'  ,width:85 	},
				],
				pagingButton : false
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
							{	dataIndex: 'acpt_dvcd'		, width:  60, align: 'center'	, text: Language.get('acpt_dvcd'		, '수주구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_dvcd')
							},{	dataIndex: 'invc_numb'		, width:  80, align: 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
							},{	dataIndex: 'line_seqn'		, width:  40, align: 'center'	, text: Language.get('line_seqn'		, '순번'			)
							},{	dataIndex: 'item_code'		, width: 100, align: 'center'	, text: Language.get('item_code'		, '품목코드'		)
							},{	dataIndex: 'item_name'		, width: 160, align: 'left'		, text: Language.get('item'				, '품목명'			)
							},{	dataIndex: 'item_spec'		, width: 100, align: 'left'		, text: Language.get('item_spec'		, '품목규격'		)
							},{	dataIndex: 'invc_date'		, width:  80, align: 'center'	, text: Language.get('acpt_date'		, '수주일자'		)
							},{	dataIndex: 'deli_date'		, width:  80, align: 'center'	, text: Language.get('deli_date'		, '납기일자'		)
							},{	dataIndex: 'invc_qntt'		, width:  60, align: 'right'	, text: Language.get('invc_qntt'		, '수주량'			), xtype:'numericcolumn', format:'#,##0.##'
							},{	dataIndex: 'revs_numb'		, width:  60, align: 'right'	, text: Language.get('revs_numb'		, '리비전'			), xtype:'numericcolumn',
								tdCls : 'editingcolumn',
								editor	: {
									xtype	:'numericfield',
									selectOnFocus : true,
									allowBlank	: false,
									enableKeyEvents : true,
									listeners : {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER) {
												var grid = self.up('grid'),
													store = me.getStore(),
													selection = me.getSelectionModel().getSelection()[0],
													row = store.indexOf(selection);
												grid.plugins[0].startEdit(row, grid.columns[6]);
											}
										}
									}
								}
							},{	dataIndex: 'cstm_name'		, width: 200, align: 'left'		, text: Language.get('cstm_name'		, '거래처명'		)
							}
						]
			};
		return item;
	}
});