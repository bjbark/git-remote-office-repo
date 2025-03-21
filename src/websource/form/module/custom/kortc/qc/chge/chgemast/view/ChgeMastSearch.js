Ext.define('module.custom.kortc.qc.chge.chgemast.view.ChgeMastsearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-chgemast-search',

	initComponent: function(){
		var me = this;
		me.items =  [
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
				{	xtype		: 'fieldset',
					border		: 3,
					flex		: 1,
					style		: { borderColor	: '#000081', borderStyle	: 'solid' },
					region		: 'center',
					height		: 34,
					margin 	: '3 0 0 0',
					defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
					layout		: 'hbox',
					items		:[
						{	xtype	: 'label',
							fieldCls: 'requiredindex',
							text	: 'SEARCH  | ',
							margin	: '5 10 0 0',
							style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
						},{ name	: 'find_name',
							xtype	: 'searchfield',
							flex	: 4,
							emptyText		: '',
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										var searchButton = self.up('form').down('[action=selectAction]');
										searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
									}
								},
							}
						}
					]
				},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
					style	: 'background:url("../../../resource/img/btn_search_icon.png")'
				},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
				}
			]
		};
	return line;
	},

	createLine1 : function(){
		var	me	= this,
			line =
				{	xtype      : 'fieldset',
					title      : '상세검색',
					collapsible: true,
					collapsed  : false,
					name       : 'collapsed',
					layout     : 'vbox',
					defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
					items : [
						{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '0 0 0 -18',
						items : [
						{	xtype : 'fieldset',
							layout: 'vbox',
							border: 0,
							margin: '0 0 0 0',
							items : [
								{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','접수일자'),
											xtype		: 'betweenfield',
											name		: 'rcpt_date1',
											pair		: 'rcpt_date2',
											labelWidth	: 99,
											width		: 198,
											margin		: '0 0 0 0',
											root		: true,
											value		: new Date()
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'rcpt_date2',
											pair		: 'rcpt_date1',
											labelWidth	: 15,
											width		: 115,
											margin		: '0 0 0 0',
											value		: new Date()
										},{	fieldLabel	: Language.get('','상태'),
											xtype		: 'lookupfield',
											name		: 'line_clos',
											lookupValue	: resource.lookup('line_clos'),
											width		: 160,
											hidden		: true
										},{	fieldLabel	: Language.get('cstm','품목'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'item_name',
											width		: 315,
											pair		: 'item_idcd',
											clearable	: true,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-item-popup-kortc',
												params	: { stor_grp : _global.stor_grp , line_stat : '0' },
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('item_name'));
													pairField.setValue(records[0].get('item_idcd'));
												}
											}
										},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('cstm','거래처'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											margin		: '5 0 0 29',
											name		: 'cstm_name',
											width		: 285,
											pair		: 'cstm_idcd',
											clearable	: true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-cstm-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
										},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
											items	: [
												{	xtype		: 'checkbox',
													boxLabel	: '사람',
													name		: '4mdv_1fst',
													width		: 50,
													margin		: '0 0 0 52',
													/*listeners: {
														change: function(chkbox,newVal,oldVal){
															if(chkbox.getValue() == true){
																me.chk(chkbox.getValue(),this);
															}
														}
													}*/
												},{	xtype		: 'checkbox',
													boxLabel	: '재료',
													name		: '4mdv_2snd',
													width		: 50,
													margin		: '0 0 0 10',
												},{	xtype		: 'checkbox',
													boxLabel	: '기계',
													name		: '4mdv_3trd',
													width		: 50,
													margin		: '0 0 0 10',
												},{	xtype		: 'checkbox',
													boxLabel	: '방법',
													name		: '4mdv_4frt',
													width		: 50,
													margin		: '0 0 0 10',
												}
											]
										}
									]
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