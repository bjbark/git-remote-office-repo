Ext.define('module.custom.iypkg.prod.dailyworklist.view.DailyWorkListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-dailyworklist-search',
	initComponent: function(){
		var me = this;
			me.items = [ me.searchBasic(),me.createLine1() ];
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
				height : 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor	: '#000081', borderStyle	: 'solid' },
						region		: 'center',
						height		: 34,
						margin		: '3 0 0 0',
						defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		: [
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name			: 'find_name',
								xtype			: 'searchfield',
								flex			: 4,
								emptyText		: '조회할 공정명 또는 보조명을 입력하세요...',
								enableKeyEvents	: true,
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
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					},
				]
			}
		;
		return line;
	},

	createLine1 : function() {
		var me = this,
			line = {
				xtype : 'fieldset',
				title : '상세검색',
				collapsible : true,
				collapsed	: false,
				items : [
					{	fieldLabel	: Language.get('','조회기간'),
						xtype		: 'betweenfield',
						name		: 'fr_dt',
						pair		: 'to_dt',
						labelWidth	: 99,
						width		: 193,
						margin		: '0 0 0 2',
						value		: new Date(),
						root		: true,
						clearable	: false,
						listeners	: {
							blur : function(value){
								var val = value.getValue(),
									date = Ext.Date.format(new Date(), 'Y-m-d');
								;
								if(val == '' || val == null){
									value.setValue(date);
								}
							}
						}
					},{	xtype		: 'betweenfield',
						fieldLabel	:'~',
						name		: 'to_dt',
						pair		: 'fr_dt',
						labelWidth	: 15,
						width		: 110,
						margin		: '0 60 0 0',
						clearable	: false,
						listeners	: {
							blur : function(value){
								var val = value.getValue(),
									date = Ext.Date.format(new Date(), 'Y-m-d');
								;
								if(val == '' || val == null){
									value.setValue(date);
								}
							}
						}
					},{	fieldLabel	: Language.get('wkct','공정코드'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wkct_name',
						pair		: 'wkct_idcd',
						width		: 215,
						labelWidth	:  50,
						clearable	: true,
						popup		:
							{	select	: 'SINGLE',
								widget	: 'lookup-wkct-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('wkct_name'));
									pairField.setValue(records[0].get('wkct_idcd'));
								}
							}
						},{ name : 'wkct_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('','~'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wkct_name2',
						pair		: 'wkct_idcd2',
						width		: 175,
						labelWidth	:  10,
						clearable	: true,
						popup		:
							{	select	: 'SINGLE',
								widget	: 'lookup-wkct-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('wkct_name'));
									pairField.setValue(records[0].get('wkct_idcd'));
								}
							}
						},{ name : 'wkct_idcd2', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('','합계구분'),
						xtype		: 'lookupfield',
						name		: 'chk',
						lookupValue	: [['1','소계'],['2','일계'],['3','월계'],['4','합계']],
						multiSelect	: true ,
						editable	: false,
						labelWidth	: 99,
						width		: 280,
						margin		: '0 60 0 0',
					}
				]
			}
		;
		return line;
	}
});