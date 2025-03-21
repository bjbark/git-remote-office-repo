Ext.define('module.cost.stndcost.view.StndCostLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-stndcost-lister',

	store		: 'module.cost.stndcost.store.StndCost',

	border		: 0,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary'}],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	viewConfig	: { markDirty: false , loadMask : false},

	initComponent : function () {
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
					{	text : '<span class="write-button">엑셀 Upload</span>', action : 'uploadAction'	, cls: 'button1-style'	} , '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
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
					{	dataIndex: 'stnd_date'			, text : Language.get('stnd_date'			,'기준일자'		), width : 90	, align : 'center'
					},{ dataIndex: 'mold_idcd'			, text : Language.get('acpt_numb'			,'금형ID'		), width : 100	, align : 'center', hidden : true
					},{ dataIndex: 'mold_name'			, text : Language.get('acpt_case_name'		,'금형명'		), width : 300	, align : 'left'
					},{ dataIndex: 'mtrl_bacd_name'		, text : Language.get('mtrl_bacd_name'		,'재질ba'		), width : 100	, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('mtrl_dvcd'), hidden : true
					},{ dataIndex: 'mtrl_bacd'			, text : Language.get('mtrl_bacd'			,'재질분류'		), width : 100	, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('mtrl_dvcd'), hidden : true
					},{ dataIndex: 'grad_dvcd'			, text : Language.get('grad_dvcd'			,'등급구분'		), width : 100	, align : 'center' , lookupValue	: resource.lookup('grad_dvcd')
					},{ dataIndex: 'used_tons'			, text : Language.get('used_tons'			,'사용톤수'		), width : 100	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'runr_wigt'			, text : Language.get('runr_wigt'			,'런너중량'		), width : 100	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'prod_wigt'			, text : Language.get('prod_wigt'			,'제품중량'		), width : 70	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'cycl_time'			, text : Language.get('cycl_time'			,'회전시간'		), width : 70	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'daly_mtrl_usag_qntt', text : Language.get('daly_mtrl_usag_qntt'	,'일일재료사용량'	), width : 150	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'need_mnhr'			, text : Language.get('need_mnhr'			,'소요공수'		), width : 70	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'/*, format:  '#,##0.0'*/
					},{ dataIndex: 'mtrl_wdrw_rate'		, text : Language.get('mtrl_wdrw_rate'		,'재료회수율'	), width : 80	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'mtrl_cost'			, text : Language.get('mtrl_cost'			,'재료비'		), width : 70	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'/*, format:  '#,##0.0'*/
					},{ dataIndex: 'labo_cost'			, text : Language.get('labo_cost'			,'노무비'		), width : 70	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'/*, format:  '#,##0.00'*/
					},{ dataIndex: 'udir_labo_nonn'		, text : Language.get('udir_labo_nonn'		,'간접노무비'	), width : 80	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'cost_ttsm'			, text : Language.get('cost_ttsm'			,'원가합계'		), width : 70	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'sale_pric'			, text : Language.get('sale_pric'			,'판매단가'		), width : 70	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum', hidden : true
					},{ dataIndex: 'cost_rate'			, text : Language.get('cost_rate'			,'원가비율'		), width : 70	, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum', hidden : true
					},{ dataIndex: 'user_memo'			, text : Language.get('user_memo'			,'비고'		), flex : 100	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});