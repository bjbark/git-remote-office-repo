Ext.define('module.prod.order.workbooklist.view.WorkBookListListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbooklist-lister-detail',
	store		: 'module.prod.order.workbooklist.store.WorkBookListDetail',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get('prod_date'		,'생산일자'	) , width :  80	, align : 'center'
					},{	dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정상태'	) , width :  60	, align : 'center'
					},{	dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비'	) , width : 100	, align : 'left'
					},{	dataIndex: 'dayn_dvcd'		, text : Language.get('dayn_dvcd'		,'주/야'	) , width :  45	, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('dayn_dvcd')
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'	) , width : 120	, align : 'center'
					},{	dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호') , width :  80	, align : 'center'
					},{	dataIndex: 'mold_code'		, text : Language.get('pjod_idcd'		,'금형번호'	) , width :  80	, align : 'center'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 100	, align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'	) , width : 300	, align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'품목규격'	) , width : 250	, align : 'left'	, hidden : true
					},{ dataIndex: 'mtrl_name'		, text : Language.get('mtrl_name'		,'재질'	) , width :  80	, align : 'center'
					},{ dataIndex: 'cavity'			, text : Language.get('cavity'			,'CAVITY') , width :  55	, align : 'center'
					},{ dataIndex: 'need_time'		, text : Language.get('need_time'		,'소요시간'	) , width :  70	, align : 'center'
					},{ dataIndex: 'theo_qntt'		, text : Language.get('theo_qntt'		,'이론수량'	) , width :  85	, align : 'right' , xtype: 'numericcolumn', hidden : true
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width :  70	, align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'	) , width :  70	, align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	) , width :  70	, align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'invc_pric'		, text : Language.get('invc_pric'		,'단가'	) , width :  70	, align : 'right' , xtype: 'numericcolumn', hidden : true
					},{ dataIndex: 'sply_amnt'		, text : Language.get('sply_amnt'		,'금액'	) , width : 130	, align : 'right' , xtype: 'numericcolumn', hidden : true
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'유실 및 불량 현황') , flex : 1	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});