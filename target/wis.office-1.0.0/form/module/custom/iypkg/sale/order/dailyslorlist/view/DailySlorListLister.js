Ext.define('module.custom.iypkg.sale.order.dailyslorlist.view.DailySlorListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dailyslorlist-lister'			,
	store		: 'module.custom.iypkg.sale.order.dailyslorlist.store.DailySlorList'	,

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'},{ ptype:'filterbar'},{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '4' || record.get('rnum') == '5'){
				return 'text-warn';
			}else if(record.get('rnum') == '3'){
				return 'text-blue';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				pagingButton : true,
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'detail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						},
					},
					'-','->','->','->','->','-',
					{	text : '<span class="write-button">수주일보 발행</span>'	, action : 'printAction'	, cls: 'button1-style'} , '-',
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
					{	dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'수주일자'		), width :  80, align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'수주처명'		), width : 193, align : 'left'
					},{ dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'수주번호'		), width : 124, align : 'center'
					},{ dataIndex: 'bxty_name'		, text : Language.get('bxty_name'		,'상자형식'		), width : 100, align : 'center'
					},{ dataIndex: 'prod_name'		, text : Language.get('prod_name'		,'품명'			), width : 250, align : 'left'
					},{ dataIndex: 'prod_spec'		, text : Language.get('prod_spec'		,'상자규격'		), width : 130, align : 'left'
					},{ dataIndex: 'acpt_qntt'		, text : Language.get('acpt_qntt'		,'수주량'			), width :  80, align : 'right', xtype:'numericcolumn'
					},{ dataIndex: 'pqty_pric'		, text : Language.get('pqty_pric'		,'단가'			), width :  80, align : 'right', xtype:'numericcolumn'
					},{ dataIndex: 'sply_amnt'		, text : Language.get('sply_amnt'		,'공급가액'		), width : 120, align : 'right', xtype:'numericcolumn'
					},{ dataIndex: 'pcod_numb'		, text : Language.get('pcod_numb'		,'P/O No'		), width : 180, align : 'left'
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		), width :  80, align : 'center'
					}
				]
			}
		;
		return item;
	}
});