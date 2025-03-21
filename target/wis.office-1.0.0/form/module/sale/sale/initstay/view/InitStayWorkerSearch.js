Ext.define('module.sale.sale.initstay.view.InitStayWorkerSearch',{ extend: 'Axt.form.Search',
	alias: 'widget.module-initstay-worker-search',
	style	: 'padding-left : 5px;' ,

	initComponent: function(){
		var me = this;
		me.items = [
			me.addonSearch()
		];
		me.callParent();
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 5 5 0', padding: '0', border: 0 ,  },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' , },
				items			: [
				{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
					items : [
					{	xtype		: 'lookupfield',
						name		: 'date_dvcd',
						editable	: false,
						width		: 100,
						margin		: '0 0 0 25',
						lookupValue	: [['1','납기일자']/*,['2','출고일자']*/],
						value		: '1'
					},{	xtype		: 'betweenfield',
						name		: 'fr_dt',
						pair		: 'to_dt',
						width		: 95,
						margin		: '0 0 0 2',
						root		: true,
						required	: true,
						fieldCls	: 'requiredindex',
						value		: Ext.Date.getFirstDateOfMonth(new Date()),
					},{	xtype		: 'betweenfield',
						fieldLabel	:'~',
						name		: 'to_dt',
						pair		: 'fr_dt',
						labelWidth	: 15,
						width		: 115,
						value		: Ext.Date.getLastDateOfMonth(new Date()),
						required	: true,
						fieldCls	: 'requiredindex',
					},{	fieldLabel	: Language.get('','거래처'),
						xtype		: 'popupfield',
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						clearable	: true,
						labelWidth	: 50,
						width		: 180,
						margin		: '0 0 0 5',
						popup: {
							select : 'SINGLE',
							widget : 'lookup-cstm-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0', sale_cstm_yorn : '1' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
							}
						}
					},{	name : 'cstm_idcd', xtype : 'textfield', hidden : true
					},{	fieldLabel	: Language.get('item','품목'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						labelWidth	: 50,
						width		: 250,
						name		: 'item_name',
						pair		: 'item_idcd',
						clearable	: true ,
						margin		: '0 0 0 5',
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-item-popup',
							params	: { stor_grp : _global.stor_grp , row_sts : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('item_name'));
								pairField.setValue(records[0].get('item_idcd'));
							}
						},
					},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('','Batch 번호'),
						xtype		: 'textfield',
						name		: 'lott_numb',
						labelWidth	: 70,
						margin		: '0 0 0 5',
						width		: 190
					},{	fieldLabel	: Language.get('','수주구분'),
						xtype		: 'lookupfield',
						name		: 'acpt_dvcd',
						width		: 155,
						labelWidth	: 70,
						margin		: '0 0 0 5',
						editable	:false,
						lookupValue	: resource.lookup('acpt_dvcd'),
						value		: '1000'
					},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
						xtype		: 'button',
						width		: 60,
						height		: 25,
						margin		: '0 0 0 20',
						cls			: 'button-style',
						action		: 'selectAction2'
						}
					]
				}
			]
		};
		return line;
	},

});