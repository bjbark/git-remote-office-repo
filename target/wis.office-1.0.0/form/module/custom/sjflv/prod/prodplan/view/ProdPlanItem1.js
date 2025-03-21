Ext.define('module.custom.sjflv.prod.prodplan.view.ProdPlanItem1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-prodplan-lister-item1',
	
	store		: 'module.custom.sjflv.prod.prodplan.store.ProdPlanItem1',
	split		: true,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	features	: [ { ftype : 'grid-summary'}],
	
	initComponent : function () {
		var me = this
			me.columns		= me.columnItem();
			me.dockedItems	= [me.createItem()];
			me.callParent();
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults	: {   style: 'text-align:center'},
				items		: [
					{	dataIndex: 'acct_name'	, text: Language.get('acct_bacd'	, '계정구분'	) , width: 70	, align:'center'
					},{ dataIndex: 'item_code'	, text: Language.get('item_code'	, '원재료코드'	) , width: 80	, align:'center'
					},{ dataIndex: 'item_name'	, text: Language.get('item_name'	, '품명'		) , width: 200	, align:'left'
					},{ dataIndex: 'item_spec'	, text: Language.get('item_spec'	, '규격'		) , width: 140	, align:'left'
					},{ dataIndex: 'mixx_rate'	, text: Language.get('mixx_rate'	, '배합비'		) , width: 80	, align:'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'	, summaryType: 'sum',
					},{ dataIndex: 'need_qntt'	, text: Language.get(''				, '소요량'		) , width: 100	, align:'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{ dataIndex: 'stok_qntt'	, text: Language.get('stok_qntt'	, '가용재고'	) , width: 100	, align:'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{ dataIndex: 'baln_qntt'	, text: Language.get(''				, '과부족량'	) , width: 100	, align:'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{ dataIndex: ''			, text: Language.get(''				, '추가 생산'	) , width: 80	, align:'center'
						, renderer: function(val,meta,rec) {
							if (rec.get('acct_bacd') === '2002' && rec.get('baln_qntt') > 0) {
								var id = Ext.id();
								Ext.defer(function() {
									Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										text	: '<span style="color : white !important;">추가생산</span>',
										width	: 60,
										height	: 19,
										cls		: 'button-style',
										handler	: function(b, e){
											me.loadPopup(rec)
										}
									});
								}, 50);
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						}
					}
				]
			}
		;
		return item;
	},
	
	createItem: function() {
		var me = this;
		var item = {
			xtype: 'toolbar',
			dock: 'top',
			items: [
				{	xtype		: 'numericfield',
					fieldLabel	: '생산계획량',
					name		: 'plan_baln_qntt',
					margin		: '0 0 0 17',
					labelAlign	: 'right', 
					labelWidth	: 70,
					labelSeparator: '',
					enableKeyEvents: true,
					listeners	: {
						keydown	: function(self, e, eOpts) {
							if (e.keyCode == e.ENTER || e.keyCode == 9) {
								me.down('[name=calc_mix_btn]').fireEvent('click');
							}
						}
					}
				},{	xtype		: 'button',
					text		: '<span style="color : white !important;">적용</span>',
					name		: 'calc_mix_btn',
					width		: 60,
					height		: 20,
					cls			: 'button-style',
					listeners	: {
						click	: function() {
							var store = me.getStore();
							var planBalnQntt = me.down('[name=plan_baln_qntt]').getValue();
							var incmLossRate = me.down('[name=incm_loss_rate]').getValue();
							
							store.each(function(rec){
								var needQntt = (planBalnQntt / (100 - incmLossRate) * 100) * (rec.get('mixx_rate') / 100);
								var stokQntt = rec.get('stok_qntt')
								rec.set('need_qntt', needQntt);
								if (stokQntt < needQntt) {
									rec.set('baln_qntt', needQntt - stokQntt);
								} else {
									rec.set('baln_qntt', 0);
								}
							});
						}
					}
				},{	xtype	: 'numericfield',
					name	: 'incm_loss_rate',
					hidden	: true
				},{	xtype		: 'numericfield',
					fieldLabel	: '최대생산량',
					name		: 'max_prod_qntt',
					margin		: '0 0 0 17',
					labelAlign	: 'right', 
					labelWidth	: 70,
					labelSeparator: '',
					readOnly	: true,
					fieldCls	: 'readonlyfield'
				}
			]
		}
		return item;
	},
	
	loadPopup: function(record) {
		resource.loadPopup({
			widget	: 'module-sjflv-addprodplan-popup',
			params	: record
		});
	}
});

