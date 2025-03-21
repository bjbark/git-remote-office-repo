Ext.define('module.custom.iypkg.mtrl.po.purcordrlist1.view.PurcOrdrList1Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-purcordrlist1-lister',
	store		: 'module.custom.iypkg.mtrl.po.purcordrlist1.store.PurcOrdrList1',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }, { ptype:'filterbar'} ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('fabc_name') == '합계' || record.get('ppkd_dvcd') == '총계'){
				return 'text-warn';
			}else if(record.get('fabc_name') == '소계'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				pagingButton : false,
				items : [
					{	xtype	: 'button',
						iconCls	: 'filterIcon',
						toggleGroup:'master',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'ppkd_dvcd'			, width:  60, align : 'center'	, text: Language.get('ppkd_dvcd'	, '종'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('ppkd_dvcd')
					},{	dataIndex:	'fabc_name'			, width: 200, align : 'left'	, text: Language.get('fabc_name'	, '원단명'		)
					},{	dataIndex:	'ppln_dvcd'			, width:  70, align : 'center'	, text: Language.get('ppln_dvcd'	, '골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'fabc_spec'			, width: 150, align : 'left'	, text: Language.get('fabc_spec'	, '원단규격'	)
					},{	dataIndex:	'cstm_name'			, width: 150, align : 'left'	, text: Language.get('cstm_name'	, '입고처'		)
					},{	dataIndex:	'istt_qntt'			, width:  80, align : 'right'	, text: Language.get('istt_qntt'	, '입고량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'pqty_pric'			, width:  80, align : 'right'	, text: Language.get('pqty_pric'	, '단가/개'	), xtype: 'numericcolumn'
					},{	dataIndex:	'mxm2_pric'			, width:  80, align : 'right'	, text: Language.get('mxm2_pric'	, '단가/m2'	), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_amnt'			, width: 100, align : 'right'	, text: Language.get('istt_amnt'	, '공급가'		), xtype: 'numericcolumn'
					},{	dataIndex:	'm2'				, width: 100, align : 'right'	, text: Language.get('m2'			, '총m2'		), xtype: 'numericcolumn'
					}
				], pagingButton : false
			};
		return item;
	}
 });