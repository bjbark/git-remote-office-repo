Ext.define('module.user.laborate.view.LaboRateSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-laborate-search',

	initComponent: function() {
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
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
						margin		: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		: [
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText		: '조회할 임율코드 또는 임율명을 입력하세요...',
								enableKeyEvents	: true,
								listeners		:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
										}
									}
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
		var me = this,
			line = {
				xtype		: 'fieldset',
				title		: '상세검색',
				collapsible : true,
				collapsed	: true,
				items		: [
					{	fieldLabel	: Language.get('labo_rate_dvcd','임율구분'),
						xtype		: 'lookupfield',
						name		: 'labo_rate_dvcd',
						hidden		: false,
						lookupValue	: resource.lookup('labo_rate_dvcd'),
						margin		: '0 0 0 20'
					},{	fieldLabel	: '관련코드'	,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wkrn_name',
						pair		: 'wkrn_idcd',
						clearable	: true ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-wkrn-code-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('wkrn_name'));
								pairField.setValue(records[0].get('wkrn_idcd'));
							},
							create : function (self ) {
								var panel = self.up('form'),
									wkrn_dvcd = panel.down('[name=labo_rate_dvcd]').getValue();
								Ext.merge(self.popup.params, {
									wkrn_dvcd : wkrn_dvcd
								});
							}
						}
					},{	name : 'wkrn_idcd', xtype : 'textfield' , hidden : true
					}
				]
			}
		;
		return line;
	}
});