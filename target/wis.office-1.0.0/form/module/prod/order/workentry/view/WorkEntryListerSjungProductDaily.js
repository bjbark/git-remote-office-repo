Ext.define('module.prod.order.workentry.view.WorkEntryListerSjungProductDaily', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-lister-sjung-daily'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workentry.store.WorkEntry',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'	,'주문번호'		) , width : 100 , align : 'center'
					},{	dataIndex: 'endd_dttm'		, text : Language.get('endd_dttm'	,'생산일자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'	) , width : 80  , align : 'center', xtype : 'lookupcolumn' ,lookupValue:resource.lookup('prog_stat_dvcd')
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'	,'제품코드'		) , width : 150 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'center'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'	,'Batch No'	) , width : 100 , align : 'center'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'	,'지시수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.###',
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'	,'생산수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.###',
					},{ dataIndex: 'strt_dttm'		, text : Language.get('strt_dttm'	,'시작일시'		) , width : 120 , align : 'center'
					},{ dataIndex: 'endd_dttm'		, text : Language.get('endd_dttm'	,'종료일시'		) , width : 120 , align : 'center'
					},{ dataIndex: 'wker_name'		, text : Language.get('wker_name'	,'작업자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'	,'포장작업자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'	,'설비번호'		) , width : 80  , align : 'center'
					},{ dataIndex: 'pckg_unit'		, text : Language.get('pckg_unit'	,'포장단위'		) , width : 100 , align : 'center'
					},{ dataIndex: 'labl_qntt'		, text : Language.get('labl_qntt'	,'라벨수량'		) , width : 100 , align : 'center',
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'	,'특이사항'		) , width : 100 , align : 'center'
					}
				]
			}
		;
		return item;
	},
});