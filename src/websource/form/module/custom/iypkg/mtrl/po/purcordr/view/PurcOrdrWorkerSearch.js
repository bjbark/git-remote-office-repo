Ext.define('module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrWorkerSearch',{ extend: 'Axt.form.Search',
	store		: 'module.custom.iypkg.mtrl.po.purcordr.store.PurcOrdrWorkInvoice',
	alias: 'widget.module-purcordr-worker-search',
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
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 5 -3 0', padding: '0', border: 0 ,  },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' , },
				items			: [
				{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
					items : [
						{	xtype : 'fieldset', layout: 'hbox' , border : 0 , margin : '0 0 0 -5',
							items : [
								{	fieldLabel	: Language.get('', '발주처' ),
									name		: 'cstm_name',
									pair		: 'cstm_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true ,
									width		: 245,
									labelWidth	: 50,
									margin		: '0 0 0 -5',
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									popup		: {
										widget	: 'lookup-cstm-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0', puch_cstm_yorn : '1' },
										result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name	: 'cstm_idcd', xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('offr_date','발주일자'),
									xtype		: 'datefield',
									name		: 'offr_date',
									clearable	: true,
									width		: 146,
									labelWidth	: 50,
									margin		: '0 0 0 3',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
								},{	fieldLabel	: Language.get('','납기일자'),
									xtype		: 'datefield',
									name		: 'deli_date',
									clearable	: true,
									width		: 146,
									labelWidth	: 50,
									margin		: '0 0 0 15',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
								},{	fieldLabel	: Language.get( '','메모'),
									xtype		: 'textfield',
									name		: 'remk_text',
									margin		: '0 0 0 3',
//									hidden		:  _global.hq_id.toUpperCase()!='N1000LIEBE',
									width		: 350,
									labelWidth	: 50,
								},{	name : 'code', xtype : 'textfield' , hidden : true
								}
							]
						}
					]
				}
			]
		};
		return line;
	},

});