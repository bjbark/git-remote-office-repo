Ext.define('module.basic.cust.cstmcredit.view.CstmCreditSearch', { extend: 'Axt.form.Search',


	alias: 'widget.module-cstmcredit-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.createLine1(),
		];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#000081', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 거래처코드 또는 거래처명을 입력하세요...',
								enableKeyEvents : true			,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
		]
	}

		return line;
	},


	createLine1 : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				defaults: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				layout	:'vbox',
				items	: [
					{	xtype	: 'fieldset', layout: 'hbox',
						margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('proc_drtr_name', '영업담당' ),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'sale_drtr_name',
								pair		: 'sale_drtr_idcd',
								emptyText	: Const.infoNull.queryAll,
								clearable	: true,
								width		: 208,
								popup		: {
									widget	: 'lookup-user-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	xtype		: 'textfield', name : 'sale_drtr_idcd', hidden : true
							},{	fieldLabel	: Language.get('', '거래상태'),
								xtype		: 'lookupfield',
								name		: 'trns_stop_yorn',
								editable	: false,
								labelWidth	: 50 ,
								width		: 150,
								lookupValue : [["","전체"],["0","정상"],["1","정지"]],
								value		: ''
							},{	fieldLabel	: Language.get('','미수기간'),
								xtype		: 'numericfield',
								name		: 'npay_term',
								labelWidth	: 70,
								width		: 170
							},{ xtype	: 'label',
								text	: '이상',
								margin	: '4 0 5 4',
							},{ fieldLabel	: Language.get('','미수금액'),
								xtype		: 'numericfield',
								name		: 'npay_amnt',
								itemId		: '',
								width		: 180,
								margin		: '0 0 0 5',
							},{ xtype	: 'label',
								text	: '이상',
								margin	: '4 0 5 4',
							}
						]
					},
				]
			}
		return line;
	}
});