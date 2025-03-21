Ext.define('module.custom.wontc.prod.order.workbook.view.WorkBookLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbook-lister',
	store		: 'module.custom.wontc.prod.order.workbook.store.WorkBookLister',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,

			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{ dataIndex: 'invc_date'		, text : Language.get(''				,'작업일자'	) , width :  90 , align : 'center'
					},{	dataIndex: 'wkod_numb'		, text : Language.get('wkod_numb'		,'작업지시번호') , width : 130 , align : 'center'
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'	,'시작시간'	) , width :  110 , align : 'center'
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'	,'종료시간'	) , width :  110 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품목명'	) , width :  200 , align : 'left'
					},{ dataIndex: 'wkct_code'		, text : Language.get('wkct_code'		,'공정코드'	) , width :  80 , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'cvic_code'		, text : Language.get('cvic_code'		,'설비코드'	) , width :  80 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'wker_name'		, text : Language.get('wker_name'		,'작업자명'	) , width : 70 , align : 'left'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width :  80 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'	) , width :  80 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'good_qntt'		, text : Language.get('good_qntt'		,'양품수량'	) , width :  80 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	) , width :  70 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'prog_stat_dvcd'  	, text : Language.get('prog_stat_dvcd'	,'진행상태'	) , width :  70 , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('prog_stat_dvcd')
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'	) , flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});