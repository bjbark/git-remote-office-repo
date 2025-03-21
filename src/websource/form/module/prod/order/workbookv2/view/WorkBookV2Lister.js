Ext.define('module.prod.order.workbookv2.view.WorkBookV2Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv2-lister',
	store		: 'module.prod.order.workbookv2.store.WorkBookV2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		console.log(Const.MODIFY.text);
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{text : '<span style="text-decoration;"><font bold color="white" size= "2">비고작성</font></span>', iconCls: Const.MODIFY.icon, action  : 'remkModify' , cls: 'button-style', /*hidden   : !_global.auth.auth_prod_1001*/ }, //저장
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action  : Const.MODIFY.action , cls: 'button-style', hidden   : !_global.auth.auth_prod_1001 }, //저장
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action  : Const.EXPORT.action, cls: 'button-style' } //엑셀버튼.
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

					{	xtype: 'rownumberer' , width:50
					},{	dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'생산일자'		) , width :  80	, align : 'center'
					},{	dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정상태'		) , width :  60	, align : 'center', hidden:true
					},{	dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비'			) , width : 100	, align : 'left'
					},{	dataIndex: 'dayn_dvcd'		, text : Language.get('dayn_dvcd'		,'주/야'			) , width :  45	, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('dayn_dvcd')
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'		) , width : 120	, align : 'center', hidden:true
					},{	dataIndex: 'cstm_lott_numb'	, text : Language.get('cstm_lott_numb'	,'LOT번호'		) , width :  80	, align : 'center'
					},{	dataIndex: 'mold_code'		, text : Language.get('acpt_numb'		,'금형코드'		) , width :  80	, align : 'center'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100	, align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , width : 300	, align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'품목규격'		) , width : 250	, align : 'left'	, hidden : true
					},{ dataIndex: 'mtrl_name'		, text : Language.get('mtrl_name'		,'재질'			) , width :  80	, align : 'center'
					},{ dataIndex: 'cavity'			, text : Language.get('cavity'			,'CAVITY'		) , width :  55	, align : 'center'
					},{ dataIndex: 'cycl_time'		, text : Language.get('cycl_time'		,'C/T'			) , width :  40	, align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'need_time'		, text : Language.get('need_time'		,'가동시간'		) , width :  65	, xtype: 'numericcolumn',
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'		) , width :  70	, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'theo_qntt'		, text : Language.get('theo_qntt'		,'이론수량'		) , width :  85	, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'		) , width :  70	, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'acum_qntt'		, text : Language.get('acum_qntt'		,'누적수량'		) , width :  70	, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'deff_qntt'		, text : Language.get('deff_qntt'		,'잔량'			) , width :  70	, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'loss_qntt'		, text : Language.get('loss_qntt'		,'유실수량'		) , width :  85	, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum',
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'		) , width :  70	, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'good_perc'		, text : Language.get('good_perc'		,'양품률'		) , width :  60	, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'invc_pric'		, text : Language.get('invc_pric'		,'단가'			) , width :  70	, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'total'			, text : Language.get(''				,'금액'			) , width : 100	, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'cvic_drtr_name'	, text : Language.get('cvic_drtr_name'	,'설비담당자'		) , width : 75	, align : 'left'
					},{ dataIndex: 'mold_repa'		, text : Language.get('mold_repa'		,'금형수입'		) , width :  60	, align : 'center', xtype: 'lookupcolumn',lookupValue:resource.lookup('yorn')
					},{ dataIndex: 'wker_name'		, text : Language.get('wker_name'		,'작업관리자'		) , width : 75	, align : 'left'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'유실 및 불량 현황') , width : 220	, align : 'left'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'			) , width : 220	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});