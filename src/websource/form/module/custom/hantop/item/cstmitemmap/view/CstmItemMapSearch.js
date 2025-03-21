Ext.define('module.custom.hantop.item.cstmitemmap.view.CstmItemMapSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-cstmitemmap-search',

	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic()
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
							},{	fieldLabel	: '계정구분',
								xtype		: 'popupfield',
								name		: 'acct_bacd',
								pair		: 'acct_code',
								clearable	: true,
								width		: 150,
								labelWidth	: 50,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));

										var searchForm = Ext.ComponentQuery.query('module-cstmitemmap-lister-item')[0];
											master = Ext.ComponentQuery.query('module-cstmitemmap-lister1')[0];

										searchForm.down('[name=item_code]').popup.params.acct_bacd = records[0].get('base_code');

										master.getStore().clearData();
										master.getStore().loadData([],false);
									}
								},
								listeners	: {
									change	: function(){

										var searchForm = Ext.ComponentQuery.query('module-cstmitemmap-lister-item')[0];
										searchForm.down('[name=item_code]').popup.params.acct_bacd = this.getValue();
									}
								}
							},{	name		: 'acct_code', xtype : 'textfield' , hidden : true, value		: '3000',
							},{	name		: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '',
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
	}
});