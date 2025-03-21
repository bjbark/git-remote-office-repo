Ext.define('module.custom.iypkg.prod.worklist2.view.WorkList2Search', { extend: 'Axt.form.Search',
	alias: 'widget.module-worklist2-search',

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
							emptyText		: '조회할 공정명 또는 거래처명을 입력하세요...',
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
				{	xtype		: 'fieldset',
					title		: '상세검색',
					collapsible	: true,
					collapsed	: false,
					layout		: 'vbox',
					defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
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
											margin: '0 0 0 0',
											items : [
												{	fieldLabel	: Language.get('','생산일자'),
													xtype		: 'betweenfield',
													name		: 'fr_invc_date',
													pair		: 'to_invc_date',
													labelWidth	: 99,
													width		: 198,
													margin		: '0 0 0 0',
													root		: true,
													value		: Ext.Date.getFirstDateOfMonth(new Date()),
													listeners	: {
														change : function(value){
															var val  = value.getValue()
																date = Ext.Date.getFirstDateOfMonth(new Date())
															;
															if(val == '' || val == null){
																value.setValue(date);
															}
														}
													}
												},{	xtype		: 'betweenfield',
													fieldLabel	:'~',
													name		: 'to_invc_date',
													pair		: 'fr_invc_date',
													labelWidth	: 15,
													width		: 115,
													value		: new Date(),
													listeners	: {
														change : function(value){
															var val  = value.getValue()
																date = new Date()
															;
															if(val == '' || val == null){
																value.setValue(date);
															}
														}
													}
												},{	fieldLabel	: Language.get('','거래처'),
													xtype		: 'popupfield',
													name		: 'cstm_name',
													pair		: 'cstm_idcd',
													labelWidth	: 99,
													width		: 280,
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
												},{	fieldLabel	: Language.get('','수주번호'),
													xtype		: 'textfield',
													name		: '',
													labelWidth	: 99,
													width		: 280,
													margin		: '0 0 0 0',
													root		: true,
													value		: ''
												}
											]
										},{	xtype : 'fieldset',
											layout: 'hbox',
											border: 0,
											margin: '5 0 0 0',
											items : [
												{	fieldLabel	: Language.get('','수주일자'),
													xtype		: 'betweenfield',
													name		: 'fr_plan_date',
													pair		: 'to_plan_date',
													labelWidth	: 99,
													width		: 198,
													margin		: '0 0 0 0',
													root		: true,
													value		: ''
												},{	xtype		: 'betweenfield',
													fieldLabel	:'~',
													name		: 'to_plan_date',
													pair		: 'fr_plan_date',
													labelWidth	: 15,
													width		: 115,
													value		: ''
												},{	fieldLabel	: Language.get('','합계구분'),
													xtype		: 'lookupfield',
													name		: 'chk',
													lookupValue	: [['0','소계'],['1','일계'],['2','월계'],['3','합계']],
													multiSelect	: true ,
													editable	: false,
													labelWidth	: 99,
													width		: 280,
													margin		: '0 60 0 0',
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