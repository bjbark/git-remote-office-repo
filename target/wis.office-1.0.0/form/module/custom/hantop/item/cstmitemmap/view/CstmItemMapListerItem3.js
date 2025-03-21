Ext.define('module.custom.hantop.item.cstmitemmap.view.CstmItemMapListerItem3', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-cstmitemmap-lister-item3',
	layout	: {
		type: 'border'
	},

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createpannel()];
		me.callParent()  ;
	},

	createpannel : function () {
		var me = this
			item = {
				xtype			: 'form-panel',
				dock			: 'top',
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items	: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0, margin : '3 0 0 0',
								items	: [
								{	fieldLabel	: Language.get('brnd_bacd', '브랜드' ),
									name		: 'brnd_name',
									region		: 'east',
									xtype		: 'popupfield',
									width		: 200,
									editable	: false,
									enableKeyEvents : true,
									clearable	: true,
									pair		: 'brnd_bacd',
									margin		: '0 0 3 0',
									clearable	: true ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '4000' },
										result : function(records, nameField, pairField) {
											var item2 = Ext.ComponentQuery.query('module-cstmitemmap-lister-item2')[0];
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));

											item2.getStore().clearData();
											item2.getStore().loadData([],false);
										}
									},
								},{ xtype	: 'textfield', name : 'brnd_bacd', hidden : true,
								},{	fieldLabel	: Language.get('','품목명'),
									xtype		: 'textfield',
									name		: 'item_name2',
									width		: 200,
								}
							]
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 100,
								height		: 50,
								margin		: '3 0 0 20',
								cls			: 'button-style',
								action		: 'selectAction3'
							}
						]
					}
				]
			}
		;
		return item;
	},
});