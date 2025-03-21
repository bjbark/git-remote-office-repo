Ext.define('module.custom.sjflv.mtrl.isttcalc.dailypurclist2.view.DailyPurcList2Search', { extend: 'Axt.form.Search',
	alias: 'widget.module-dailypurclist2-search',

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
								emptyText	: '조회할 거래처명 또는 거래처코드를 입력하세요...',
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
				{	xtype		: 'fieldset',
					title		: '상세검색',
					collapsible	: true,
					collapsed	: false,
					layout		: 'vbox',
					defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 0 ', padding:'0', border: 0 },
					items		: [
						{	xtype : 'fieldset',
							layout: 'hbox',
							border: 0,
							margin: '0 0 0 0',
							items : [
								{	fieldLabel	: Language.get('','조회기간'),
									xtype		: 'betweenfield',
									name		: 'invc_date1',
									pair		: 'invc_date2',
									labelWidth	: 99,
									width		: 198,
									margin		: '0 0 0 2',
									root		: true,
									value		: Ext.Date.getFirstDateOfMonth(new Date())
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'invc_date2',
									pair		: 'invc_date1',
									labelWidth	: 15,
									width		: 115,
									value		: new Date()
								},{	fieldLabel	: Language.get('','거래처'),
									xtype		: 'popupfield',
									name		: 'cstm_name',
									pair		: 'cstm_idcd',
									labelWidth	: 59,
									width		: 240,
									editable	: true,
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', puch_cstm_yorn : '1' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('istt_wrhs_name','창고'),
									xtype		: 'popupfield',
									name		: 'istt_wrhs_name',
									pair		: 'istt_wrhs_idcd',
									labelWidth	: 59,
									width		: 229,
									margin		: '0 0 0 27',
									editable	: true,
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-wrhs-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('wrhs_name'));
											pairField.setValue(records[0].get('wrhs_idcd'));
										}
									}
								},{	name : 'istt_wrhs_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('item_name1','품목'),
									xtype		: 'popupfield',
									name		: 'item_name',
									pair		: 'item_idcd',
									labelWidth	: 59,
									width		: 229,
									margin		: '0 0 0 27',
									editable	: true,
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-item-popup-v4',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
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
							margin: '0 0 0 0',
							items : [
//								{	fieldLabel	: Language.get('','자료구분'),
//									xtype		: 'lookupfield',
//									name		: 'chk',
//									lookupValue	: resource.lookup(''),
//									multiSelect	: true ,
//									editable	: false,
//									labelWidth	: 101,
//									width		: 200,
//									margin		: '5 5 5 0',
//								},
								{	fieldLabel	: Language.get('','합계구분'),
									xtype		: 'lookupfield',
									name		: 'chk',
									margin		: '5 0 0 2',
									lookupValue	: [['1','소계'],['2','일계'],['3','월계'],['4','합계']],
									multiSelect	: true ,
									editable	: false,
									labelWidth	: 99,
									width		: 313,
									value		: ["1", "2", "3", "4"],
								},{	fieldLabel	: Language.get('acct_bacd','계정구분'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'acct_bacd_name',
									pair		: 'acct_bacd',
									margin		: '5 5 5 0',
									width		: 240,
									labelWidth	:  59,
									clearable	: true,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));
										}
									},
									hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
								},{	name		: 'acct_bacd', xtype : 'textfield' , hidden : true,
								},{ xtype	: 'fieldcontainer',
									layout	: { type: 'hbox'},
									margin	: '5 0 0 90',
									items	:[
										,{	xtype	: 'label',
											text	: '이월',
											name	: 'optn_3',
											width	: 80,
											style	: { color: 'black', backgroundColor : 'Yellow', textAlign : 'center'},
											margin	: '8 0 8 0',
										},{	xtype	: 'label',
											text	: '반품처리',
											margin	: '8 0 8 0',
											style	: 'background-color:#cbffc8 !important; text-align:center;',
											width	: 80
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