Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkBookSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-sjflv-workbook-search',

	initComponent: function() {
		var me = this;
		me.items = [ me.searchBasic(),me.createLine1()];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line =
				{	xtype	: 'fieldset',
					border	: 0,
					style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
					region	: 'center',
					width	: '100%',
					height	: 40,
					margin	: '0 40 0 40',
					items	:[
						{	xtype		: 'fieldset',
							border		: 3,
							flex		: 1,
							style		: { borderColor : '#000081', borderStyle : 'solid' },
							region		: 'center',
							height		: 34,
							margin		: '3 0 0 0',
							defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
							layout		: 'hbox',
							items		: [
								{	xtype		: 'label',
									fieldCls	: 'requiredindex',
									text		: 'SEARCH  | ',
									margin		: '5 10 0 0',
									style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name		: 'find_name',
									xtype		: 'searchfield',
									flex		: 4,
									emptyText	: '조회할 호기 또는 품명을 입력하세요...',
									enableKeyEvents : true,
									listeners:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == 9) {
												var searchButton = self.up('form').down('[action=selectAction]');
												searchButton.fireEvent('click', searchButton); //조회버튼클릭
											}
										},
									}
								}
							]
						},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						},{	xtype	: 'fieldset',border : 0 ,region : 'north',height : 34, width : 2
						}
					]
				};
		return line;
	},

	createLine1 : function(){
		var me = this,
			line =
			{
				xtype		: 'fieldset',
				collapsible	: true,
				collapsed	: true,
				title		: '상세검색',
				layout		: 'vbox',
				defaults	: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items : [
						{	xtype : 'fieldset', layout: 'hbox',
							items : [
							{	fieldLabel	: Language.get('prod_date','생산기간'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								width		: 198,
								labelWidth	: 100,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								root		: true,
								value		: Ext.Date.add( new Date(), Ext.Date.MONTH, -1)
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('wkct_name','공정'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkct_name',
								pair		: 'wkct_idcd',
								clearable	: true,
								width		: 220,
								labelWidth	: 70,
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wkct-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
									}
								}
							},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true,
								listeners:{
									change:function(self, e){
										me.down('[name=cvic_name]').popup.params = { wkct_idcd : this.getValue(), stor_grp : _global.stor_grp , line_stat : '0'}
										if(e == '' || e == null){
											me.down('[name=cvic_name]').reset();
											me.down('[name=cvic_idcd]').reset();
										}
									}
								}
							},{	fieldLabel	: Language.get('cvic_name','설비'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name 		: 'cvic_name',
								pair 		: 'cvic_idcd',
								margin		: '0 0 0 2',
								clearable	: true ,
								width		: 215,
								labelWidth	: 59,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cvic-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cvic_name'));
										pairField.setValue(records[0].get('cvic_idcd'));
									}
								}
							},{name : 'cvic_idcd', xtype : 'textfield' , hidden : true}
							]
						},{	xtype : 'fieldset', layout: 'hbox',
							items : [
								{	fieldLabel	: Language.get('item','품목'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									width		: 286,
									labelWidth	: 72,
									name		: 'item_name',
									pair		: 'item_idcd',
									clearable	: true,
									margin		: '0 0 0 28',
									popup: {
										select  : 'SINGLE',
										widget  : 'lookup-item-popup-v4',
										params  : { stor_grp : _global.stor_grp , line_stat : '0' },
										result  : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('item_name'));
											pairField.setValue(records[0].get('item_idcd'));
										}
									}
								},{ name : 'item_idcd', xtype : 'textfield' , hidden : true
								},{	name		: 'lott_numb' ,
									xtype		: 'searchfield' ,
									fieldLabel	: 'LOT 번호',
									width		: 219,
									labelWidth	: 68,
									margin		: '0 0 0 2',
									clearable	: true,
									readOnly	: false ,
									allowBlank	: true,
								},{	fieldLabel	: Language.get('dayn_dvcd','주/야'),
									xtype		: 'lookupfield',
									name		: 'dayn_dvcd',
									width		: 90,
									labelWidth	: 30,
									margin		: '0 0 0 30',
									clearable	: true ,
									lookupValue	: resource.lookup('dayn_dvcd')
								},
						]
					}
				]
		};
		return line;
	}
});