Ext.define('module.custom.dhtec.sale.sale.saleplanlist.view.SalePlanListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-saleplanlist-search',
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.addonSearch()
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
							{	xtype		: 'label',
								fieldCls	: 'requiredindex',
								text		: 'SEARCH  | ',
								margin		: '5 10 0 0',
								style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name		: 'find_name',
								xtype		: 'searchfield',
								flex		: 4	,
								emptyText	: '조회할 거래처코드 또는 거래처명을 입력하세요...',
								enableKeyEvents : true,
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
	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width: 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox',
						items	: [
							{	fieldLabel	: Language.get('inqy_date','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								value		: Ext.Date.getFirstDateOfMonth(new Date),
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 2',
								root		: true,
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								labelWidth	: 15,
								width		: 115
							},{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								width		: 315,
								pair		: 'cstm_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('sale_drtr_name','영업담당'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								width		: 315,
								pair		: 'drtr_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
							}
//							,{	xtype	: 'fieldcontainer',
//								layout	: { type: 'vbox', align: 'stretch' } ,
//								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
//								margin	: '3 0 3 20',
//								width	: 130 ,
//								items	: [
//									{	text		: '긴급여부', xtype : 'label', style : 'text-align:center;'
//									},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
//										items		: [
//											{	xtype		: 'checkboxfield',
//												boxLabel	: '예',
//												name		: 'emgc_yorn1',
//												style		: { color: 'Black'},
//												margin		: '3 0 0 10',
//												width		: 50,
//												inputValue	: '0',
//												listeners: {
//													change: function(chkbox,newVal,oldVal){
//														if(chkbox.getValue() == true){
//															var a = me.down('[name=emgc_yorn0]').getValue();
//															if(chkbox.getValue() == true && a == true){
//																me.down('[name=emgc_yorn0]').setValue(false);
//															}
//														}
//													}
//												}
//											},{	xtype		: 'checkboxfield',
//												boxLabel	: '아니오',
//												name		: 'emgc_yorn0',
//												style		: { color: 'Black'},
//												margin		: '3 0 0 10',
//												width		: 70,
//												inputValue	: '1',
//												checked		: true,
//												listeners: {
//													change: function(chkbox,newVal,oldVal){
//														if(chkbox.getValue() == true){
//															var a = me.down('[name=emgc_yorn1]').getValue();
//															if(chkbox.getValue() == true && a == true){
//																me.down('[name=emgc_yorn1]').setValue(false);
//															}
//														}
//													},
//												}
//											}
//										]
//									}
//								]
//							}
	 					]
					}
				]
			};
		return line;
	}
});