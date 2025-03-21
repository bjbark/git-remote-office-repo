Ext.define('module.custom.dehansol.sale.salelist4.view.SaleList4Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salelist4-lister',
	store		: 'module.custom.dehansol.sale.salelist4.store.SaleList4',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent: function () {
		var me = this;
		me.columns = me.columnItem();
		me.paging	= me.pagingItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->',{	text : '<span class="write-button">매출일보발행</span>', action : 'printAction', cls: 'button1-style', width:  80} ,
					'-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } //엑셀버튼.
				],
			pagingButton : false
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cstm_name'			, text : Language.get('cstm_name'		,'거래처명'	) , width : 140 , align : 'left'
					},{	dataIndex: 'dlvy_date'			, text : Language.get(''				,'일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'plmk_kind_name'		, text : Language.get('plmk_kind_name'	,'제판종류명'	) , width : 80  , align : 'center'
					},{ dataIndex: 'mesh_name'			, text : Language.get('mesh_name'		,'망사명'		) , width : 100 , align : 'center'
					},{ dataIndex: 'ostt_qntt'			, text : Language.get('invc_qntt'		,'수량'		) , width : 70  , align : 'right'
					},{ dataIndex: 'sale_pric'			, text : Language.get('invc_pric'		,'단가'		) , width : 70  , align : 'right', xtype: 'numericcolumn'
					},{ dataIndex: 'sale_amnt'			, text : Language.get(''				,'금액'		) , width : 80  , align : 'right', xtype: 'numericcolumn'
//					},{ dataIndex: 'vatx_amnt'			, text : Language.get('vatx_yorn'		,'부가세'		) , width : 80  , align : 'right', xtype: 'numericcolumn'
//					},{	dataIndex: 'ttsm_amnt'			, text : Language.get(''				,'합계'		) , width : 80  , align : 'right', xtype: 'numericcolumn'
					},{	dataIndex: 'cstm_total'			, text : Language.get(''				,'업체별'		) , width : 80  , align : 'right',
						renderer:function(val){
							if(val){
								if(val == null){
									return '';
								}else{
									var regexp = /\B(?=(\d{3})+(?!\d))/g;
									return val.toString().replace(regexp, ',');
								}
							}
						},
					},{	dataIndex: 'month_total'		, text : Language.get(''				,'월누계'	) , width : 80  , align : 'right' ,
						renderer:function(val){
							var a = null;
							if(val){
								if(val == null){
									return '';
								}else{
									var regexp = /\B(?=(\d{3})+(?!\d))/g;
									return val.toString().replace(regexp, ',');
								}
							}
						},
					},{ dataIndex: 'user_memo'			, text : Language.get('user_memo'		,'비고'	) , flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	 }

});
