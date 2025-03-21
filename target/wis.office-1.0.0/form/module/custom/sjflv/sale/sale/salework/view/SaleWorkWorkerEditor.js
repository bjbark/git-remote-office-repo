Ext.define('module.custom.sjflv.sale.sale.salework.view.SaleWorkWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-sjflv-salework-worker-editor',
	header	: false,
	height	: 45,
	getStore: function() {
		return Ext.getStore( 'module.custom.sjflv.sale.sale.salework.store.SaleWorkInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			height		: 110,
			flex		: 100 ,
			defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
			items		: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '5 0 0 -20',
						items : [
						{	fieldLabel	: Language.get('','거래처'),
							xtype		: 'popupfield',
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							clearable	: true,
							labelWidth	: 100,
							width		: 374,
							margin		: '6 0 0 0',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0', sale_cstm_yorn : '1' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('','납기일자'),
							xtype		: 'betweenfield',
							name		: 'deli_date1',
							pair		: 'deli_date2',
							width		: 170,
							margin		: '7 0 0 5',
							root		: true,
							value		: Ext.Date.getFirstDateOfMonth(new Date())
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'deli_date2',
							pair		: 'deli_date1',
							labelWidth	: 15,
							margin		: '6 0 0 0',
							width		: 120,
							value		: new Date()
						},{	fieldLabel	: Language.get('','수주구분'),
							xtype		: 'lookupfield',
							name		: 'acpt_dvcd',
							width		: 155,
							labelWidth	: 70,
							margin		: '6 0 0 15',
							editable	:false,
							lookupValue	: resource.lookup('acpt_dvcd'),
							value		: '1000'
						},{	text		: '<span class="btnTemp" style="font-size:1.3em">매출 계산서 등록 내역 조회</span>',
							xtype		: 'button',
							width		: 180,
							height		: 30,
							margin		: '2 0 0 30',
							cls			: 'button-style',
							action		: 'selectAction2'
						}
					]
				}
			]
		};
		return item;
	}
});
