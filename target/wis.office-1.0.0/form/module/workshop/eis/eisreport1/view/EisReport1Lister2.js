Ext.define('module.workshop.eis.eisreport1.view.EisReport1Lister2', { extend: 'Axt.form.Editor',

	alias		: 'widget.module-eisreport1-lister2',


	layout : {
		type: 'border'
	},

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createpannel()];
		me.callParent(arguments)  ;
	},

	createpannel : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				height			: 3000,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '',margin			: '0 0 0 650', },
				items			: [
				{	margin			: '250 0 0 0',
					border			: 0
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 570',
						items	: [
							{	fieldLabel	: Language.get('inqy_term','전송일자'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 2',
								root		: true,
								value		: new Date()
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 -40',
						items	: [
							{	fieldLabel	: Language.get('','담당자'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: '',
								width		: 200,
								pair		: '',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-user-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get(''));
										pairField.setValue(records[0].get(''));
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
						items	: [
					{		fieldLabel	: Language.get('inqy_term','전송기간'),
							xtype		: 'betweenfield',
							name		: 'invc1_date',
							pair		: 'invc2_date',
							labelWidth	: 99,
							width		: 198,
							margin		: '0 0 0 560',
							root		: true,
							value		: new Date()
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'invc2_date',
							pair		: 'invc1_date',
							margin		: '0 0 0 2',
							labelWidth	: 15,
							width		: 115,
							value		: new Date()
						}
					]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 665',
						items	: [
					{		text		: '<span class="btnTemp" style="font-size:1.3em">인증키 받기</span>',
							xtype		: 'button',
							width		: 210,
							height		: 25,
							itemId		: 'isos',
							margin		: '6 0 0 10',
							cls			: 'button-style',
							action		: 'selectAction2'
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 665',
					items	: [
								{		text		: '<span class="btnTemp" style="font-size:1.3em">실적 전송</span>',
										xtype		: 'button',
										width		: 210,
										height		: 25,
										itemId		: 'isos',
										margin		: '6 0 0 10',
										cls			: 'button-style',
										action		: 'selectAction2'
									}
								]
							}
			]
		}
		;
		return item;
	},
});