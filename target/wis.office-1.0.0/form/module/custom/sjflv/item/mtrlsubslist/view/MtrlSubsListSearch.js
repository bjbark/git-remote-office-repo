Ext.define('module.custom.sjflv.item.mtrlsubslist.view.MtrlSubsListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-mtrlsubslist-search',
	initComponent: function(){
		var me = this;
			me.items = [ me.searchBasic(),me.addonSearch()];
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
				items	:[
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor : '#000081', borderStyle : 'solid' },
						region		: 'center',
						height		: 34,
						margin 	: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		:[
							{	xtype		: 'label',
								fieldCls	: 'requiredindex',
								text		: 'SEARCH  | ',
								margin		: '5 10 0 0',
								style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name		: 'find_name',
								xtype		: 'searchfield',
								flex		: 4	,
								emptyText	: '',
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
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			}
		;
		return line;
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: true,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','실험일자'),
								xtype		: 'betweenfield',
								name		: 'test_date1',
								pair		: 'test_date2',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 0',
								root		: true,
								value		: ''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'test_date2',
								pair		: 'test_date1',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							},{	fieldLabel	: Language.get('item_name','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								pair		: 'item_idcd',
								clearable	: true ,
								width		: 190,
								labelWidth	: 50,
								margin		: '0 0 0 30',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-popup-v4',
									params	: { stor_grp : _global.stor_grp , line_stat : '0'  , acct_bacd : '원재료'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','실험자'),
								xtype		: 'textfield',
								name		: 'test_drtr_name',
								width		: 300,
								margin		: '0 0 5 0'
							},{	fieldLabel	: Language.get('','대치유형'),
								xtype		: 'lookupfield',
								name		: 'mtrl_sbzt_dvcd',
								width		: 180,
								margin		: '0 0 5 0',
								lookupValue	: resource.lookup( 'mtrl_sbzt_dvcd') ,
							}
						]
					}
				]
			};
		return line;
	}
});