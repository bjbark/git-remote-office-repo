Ext.define('module.custom.sjflv.prod.prodplanlist.view.ProdPlanListLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-prodplanlist-lister2',
	
	store		: 'module.custom.sjflv.prod.prodplanlist.store.ProdPlanListStore2',
	border		: 0,
	title		: Language.get('','원재료별 생산계획'),
	columnLines	: true,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features: [{
		groupHeaderTpl: '원재료코드: {name}',
		ftype: 'groupingsummary'
	}],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
		ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
		trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
		leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
	}],
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'->',
					{ text: Const.EXPORT.text, iconCls: Const.EXPORT.icon, action: Const.EXPORT.action, cls: 'button-style' },
				]
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
					{	text : Language.get('',	'계정구분'	) , dataIndex: 'acct_name'		, width : 100, align : 'center'
					},{	text : Language.get('',	'원재료코드') , dataIndex: 'item_code'		, width : 100, align : 'left'
					},{	text : Language.get('',	'원재료명'	) , dataIndex: 'item_name'		, width : 250, align : 'left'
					},{	text : Language.get('',	'원재료규격') , dataIndex: 'item_spec'		, width : 100, align : 'left'
					},{	text : Language.get('',	'소요량'	) , dataIndex: 'need_qntt'		, width : 100, align : 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'	, summaryType: 'sum'
					},{	text : Language.get('',	'수주번호'	) , dataIndex: 'acpt_numb'		, width : 100, align : 'center'
					},{	text : Language.get('',	'제품코드'	) , dataIndex: 'prnt_item_code'	, width : 100, align : 'left'
					},{	text : Language.get('',	'품명'		) , dataIndex: 'prnt_item_name'	, width : 150, align : 'left'
					},{	text : Language.get('',	'규격'		) , dataIndex: 'prnt_item_spec'	, width : 100, align : 'left'
					},{	text : Language.get('',	'생산계획량') , dataIndex: 'plan_qntt'		, width : 100, align : 'right'
					},{	text : Language.get('',	'납기일자'	) , dataIndex: 'deli_date'		, width : 100, align : 'center'
					},
				]
			};
		return item;
	}

});

