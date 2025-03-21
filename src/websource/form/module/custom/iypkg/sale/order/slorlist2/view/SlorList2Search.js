Ext.define('module.custom.iypkg.sale.order.slorlist2.view.SlorList2Search.js', { extend: 'Axt.form.Search',
	alias: 'widget.module-slorlist2-search',

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
								emptyText	: '조회할 수주번호 또는 품목코드를 입력하세요...',
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
					},
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
					layout     : 'vbox',
					defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 0 0', padding:'0', border: 0 },
					items : [
						{	xtype : 'fieldset',
							items : [
								{ xtype: 'fieldset', layout: 'vbox', margin : '0 0 0 0', padding:'0', border: 0 ,
								items : [
									{ xtype: 'fieldset', layout: 'hbox', margin : '0 0 0 0', padding:'0', border: 0 ,
										items : [
											{	fieldLabel	: Language.get('','수주일자'),
												xtype		: 'betweenfield',
												name		: 'fr_invc_date',
												pair		: 'to_invc_date',
												labelWidth	: 99,
												width		: 198,
												margin		: '0 0 0 2',
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
											}
										]
									},{ xtype: 'fieldset', layout: 'hbox', margin : '5 0 0 0', padding:'0', border: 0 ,
										items : [
											{	fieldLabel	: Language.get('','납기일자'),
												xtype		: 'betweenfield',
												name		: 'fr_deli_date',
												pair		: 'to_deli_date',
												labelWidth	: 99,
												width		: 198,
												margin		: '0 0 0 2',
												root		: true,
												value		: ''
											},{	xtype		: 'betweenfield',
												fieldLabel	: '~',
												name		: 'to_deli_date',
												pair		: 'fr_deli_date',
												labelWidth	: 15,
												width		: 115,
												value		: ''
												}
											]
										}
									]
								},{ xtype: 'fieldset', layout: 'vbox', margin : '0 0 0 0', padding:'0', border: 0 ,
									items : [
										{	fieldLabel	: Language.get('','거래처'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'cstm_name',
											pair		: 'cstm_idcd',
											labelWidth	: 99,
											width		: 250,
											clearable	: true ,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-cstm-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0'},
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('','품목'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'item_name',
											pair		: 'item_idcd',
											labelWidth	: 99,
											width		: 250,
											margin		: '0 0 0 0',
											clearable	: true ,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-prod-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0'},
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('prod_name'));
													pairField.setValue(records[0].get('prod_idcd'));
												}
											}
										},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{ xtype: 'fieldset', layout: 'vbox', margin : '0 0 0 0', padding:'0', border: 0 ,
									items : [
										{	fieldLabel	: Language.get('','합계구분'),
											xtype		: 'lookupfield',
											name		: 'chk',
											lookupValue	: [['1','소계'],['2','일계'],['3','월계'],['4','합계']],
											multiSelect	: true ,
											editable	: false,
											labelWidth	: 99,
											width		: 250,
											margin		: '0 0 0 0',
										},{ xtype	: 'fieldcontainer',
											layout	: { type: 'hbox'},
											margin	: '0 0 0 40',
											items	:[
												{	xtype	: 'label',
													text	: '발주',
													margin	: '8 0 8 18',
													style	: 'background-color:#ffc080 !important; text-align:center;',
													width	: 48
												},{	xtype	: 'label',
													text	: '입고',
													margin	: '8 0 8 0',
													style	: 'background-color:#ffc8fb !important; text-align:center;',
													width	: 48
												},{	xtype	: 'label',
													text	: '생산',
													margin	: '8 0 8 0',
													style	: 'background-color:#cbffc8 !important; text-align:center;',
													width	: 48
												},{	xtype	: 'label',
													text	: '출고',
													margin	: '8 0 8 0',
													style	: 'background-color:#cecfff !important; text-align:center;',
													width	: 48
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