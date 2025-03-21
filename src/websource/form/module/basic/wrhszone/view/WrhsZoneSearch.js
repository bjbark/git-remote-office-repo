Ext.define('module.basic.wrhszone.view.WrhsZoneSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-wrhszone-search',
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
							},{	fieldLabel	: Language.get('wrhs_name','창고'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wrhs_name',
								width		: 160,
								labelWidth	: 25,
								pair		: 'wrhs_idcd',
								margin		: '3 10 0 10',
								required	: true,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wrhs-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
										}
									},
								listeners	: {
									change	: function(){
										var val = this.getValue();
										if(val == '' || val == null){
											me.down('[name=wrhs_idcd]').reset();
										}
									}
								}
							},{	name : 'wrhs_idcd', xtype : 'textfield' , hidden : true
							},{	name			: 'find_name',
								xtype			: 'searchfield',
								flex			: 4,
								emptyText		: '조회할 구역명을 입력하세요...',
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
				collapsible : false,
				collapsed	: false,
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 60, labelSeparator : '' },
				items : [
					{	fieldLabel	: '상태',
						xtype		: 'lookupfield',
						name		: 'line_stat',
						width		: 170,
						value		: '',
						margin		: '0 0 0 0',
						lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' ) )	,
					}
				]
			}
		;
		return line;
	}
});