Ext.define('module.prod.basic.prodlineroute.view.ProdLineRouteDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodlineroute-lister-detail',
	store		: 'module.prod.basic.prodlineroute.store.ProdLineRouteDetail',
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
//					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action, cls: 'button-style' },'-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
			defaults: {style: 'text-align: center'},
			items : [
				{	dataIndex: 'wkfw_idcd'		, text : Language.get('wkfw_idcd'		,'ID'			) , width : 50  ,align :'center', hidden : true
				},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'항번'			) , width : 50  ,align :'center'
				},{ dataIndex: 'wkct_code'		, text : Language.get('wkct_code'		,'공정코드'		) , width : 120 ,align :'center'
				},{ dataIndex: 'wkct_name'		, text : Language.get('wkfw_name'		,'공정명'		) , width : 160
				},{	dataIndex: 'work_item_idcd'	, text : Language.get('work_item_idcd'	, '작업품목'		) , width: 150, align : 'center', hidden : true
				},{	dataIndex: 'work_item_code'	, text : Language.get('work_item_code'	, '작업품목코드'	) , width: 100, align : 'center'
				},{	dataIndex: 'work_item_name'	, text : Language.get('work_item_name'	, '작업품명'	) , width: 200, align : 'left'
				},{ dataIndex: 'wkct_insp_yorn'	, text : Language.get('wkct_insp_yorn'	,'공정검사여부')	, width : 80, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
				},{ dataIndex: 'last_wkct_yorn'	, text : Language.get('last_wkct_yorn'	,'최종공정여부')	, width : 80, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
				},{ dataIndex: 'aftr_wkct_ordr'	, text : Language.get('aftr_wkct_ordr'	,'다음공정순서')	, width : 90, align : 'right', hidden : (_global.hq_id.toUpperCase()=='N1000KOMEC')
				},{ dataIndex: 'mtrl_cost_rate'	, text : Language.get('mtrl_cost_rate'	,'재료비진척율')	, width : 100,xtype:'numericcolumn', hidden : (_global.hq_id.toUpperCase()=='N1000KOMEC')
				},{ dataIndex: 'labo_cost_rate'	, text : Language.get('labo_cost_rate'	,'노무비진척율')	, width : 100,xtype:'numericcolumn', hidden : (_global.hq_id.toUpperCase()=='N1000KOMEC')
				},{ dataIndex: 'expn_rate'		, text : Language.get('expn_rate'		,'경비진척율')	, width : 100,xtype:'numericcolumn', hidden : (_global.hq_id.toUpperCase()=='N1000KOMEC')
				},{ dataIndex: 'temp_valu'		, text : Language.get('temp_valu'		,'온도'	)	, width : 90 ,xtype:'numericcolumn', align : 'right', hidden : !(_global.hq_id.toUpperCase()=='N1000KOMEC')
				},{ dataIndex: 'temp_appr'		, text : Language.get('temp_appr'		,'온도오차'	)	, width : 100,xtype:'numericcolumn', align : 'right', hidden : !(_global.hq_id.toUpperCase()=='N1000KOMEC')
				},{ dataIndex: 'rpm_valu'		, text : Language.get('rpm_valu'		,'RPM'	)	, width : 100,xtype:'numericcolumn', align : 'right', hidden : !(_global.hq_id.toUpperCase()=='N1000KOMEC')
				},{ dataIndex: 'rpm_appr'		, text : Language.get('rpm_appr'		,'RPM오차')	, width : 100,xtype:'numericcolumn', align : 'right', hidden : !(_global.hq_id.toUpperCase()=='N1000KOMEC')
				},{ dataIndex: ''	, text : Language.get(''	,'비고')	, width : 120
				}
			]
		}
		;
		return item;
	}
});