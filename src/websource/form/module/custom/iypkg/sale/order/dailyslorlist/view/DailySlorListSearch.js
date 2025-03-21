Ext.define('module.custom.iypkg.sale.order.dailyslorlist.view.DailySlorListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-dailyslorlist-search',
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
								emptyText		: '조회할 거래처코드 또는 품목코드를 입력해주십시오.',
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
						name		: 'fr_invc_date',
						pair		: 'to_invc_date',
						labelWidth	: 99,
						width		: 193,
						margin		: '0 0 0 2',
						value		: new Date(),
						root		: true,
						clearable	: true,
						listeners	: {
							change : function(value){
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
						name		: 'to_invc_date',
						pair		: 'fr_invc_date',
						value		: new Date(),
						clearable	: true,
						labelWidth	: 15,
						width		: 110,
						listeners	: {
							change : function(value){
								var val = value.getValue(),
									date = Ext.Date.format(new Date(), 'Y-m-d');
								;
								if(val == '' || val == null){
									value.setValue(date);
								}
							}
						}
					},{	fieldLabel	: Language.get('cstm','거래처'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						width		: 215,
						labelWidth	:  50,
						clearable	: true,
						popup		:	{
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								var search = Ext.ComponentQuery.query('module-dailyslorlist-search')[0];
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
								search.down('[name=cstm_code]').setValue(records[0].get('cstm_code'));
							}
						},
						listeners	: {
							change : function(){
								var search = Ext.ComponentQuery.query('module-dailyslorlist-search')[0];
								if(this.value == ''){
									search.down('[name=cstm_code]').setValue('');
								}
							}
						}
					},{ name : 'cstm_idcd', xtype : 'textfield' , hidden : true
					},{ name : 'cstm_code', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('','~'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cstm_name2',
						pair		: 'cstm_idcd2',
						width		: 175,
						labelWidth	:  10,
						clearable	: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								var search = Ext.ComponentQuery.query('module-dailyslorlist-search')[0];
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
								search.down('[name=cstm_code2]').setValue(records[0].get('cstm_code'));
							}
						},
						listeners	: {
							change : function(){
								var search = Ext.ComponentQuery.query('module-dailyslorlist-search')[0];
								if(this.value == ''){
									search.down('[name=cstm_code2]').setValue('');
								}
							}
						}
					},{ name : 'cstm_idcd2', xtype : 'textfield' , hidden : true
					},{ name : 'cstm_code2', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('','합계구분'),
						xtype		: 'lookupfield',
						name		: 'chk',
						width		: 250,
						multiSelect	: true ,
						margin		: '0 0 0 0',
						lookupValue	: [['0','소계'],['1','일계'],['2','월계'],['3','합계']],
						value		: ["0","1","2","3"]
					}
				]
			}
		;
		return line;
	}
});