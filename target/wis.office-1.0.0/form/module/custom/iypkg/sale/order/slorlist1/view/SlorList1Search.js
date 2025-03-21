Ext.define('module.custom.iypkg.sale.order.slorlist1.view.SlorList1Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-slorlist1-search',
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.createLine1()
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
						margin	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype		: 'label'			,
								fieldCls	: 'requiredindex'	,
								text		: 'SEARCH  | '		,
								margin		: '5 10 0 0'		,
								style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name		: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 수주번호 또는 품목코드를 입력하세요.',
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
					items		: [
						{	xtype : 'fieldset',
							layout: 'hbox',
							border: 0,
							margin: '0 0 0 -18',
							items : [
								{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '0 0 0 0',
									items : [
										{	fieldLabel	: Language.get('acpt_date','수주일자'),
											xtype		: 'betweenfield',
											name		: 'fr_invc_date',
											pair		: 'to_invc_date',
											labelWidth	: 99,
											width		: 198,
											root		: true,
											clearable	: true,
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
											fieldLabel	: '~',
											name		: 'to_invc_date',
											pair		: 'fr_invc_date',
											labelWidth	: 15,
											width		: 114,
											clearable	: false,
											value		: new Date()
										},{	fieldLabel	: Language.get('','합계구분'),
											xtype		: 'lookupfield',
											name		: 'chk',
											lookupValue	: [['1','일계'],['2','월계'],['3','합계']],
											multiSelect	: true ,
											editable	: false,
											width		: 185,
											value		:'1',
											margin		: '0 0 0 30'
										},{	fieldLabel	: Language.get('cstm','거래처'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'cstm_name',
											pair		: 'cstm_idcd',
											labelWidth	: 80,
											width		: 290,
											margin		: '0 0 0 10',
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
										},{	fieldLabel	: Language.get('item','품목'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'item_name',
											pair		: 'item_idcd',
											labelWidth	: 90,
											width		: 300,
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
							}
						]
					}
				]
			};
		return line;
	}
});