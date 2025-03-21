Ext.define('module.item.itemmast3.view.ItemMast3Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-itemmast3-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
		me.callParent();
	},
	searchBasic : function(){
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
						margin 	: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		:[
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText		: '조회할 품목코드 또는 품명을 입력하세요...',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
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
			};
		return line;
	},

	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset'	,
				title : '상세검색',
				layout: 'vbox',
				collapsible : true	,
				collapsed	: false	,
				fieldDefaults	: { labelWidth : 100 },
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('acct_bacd','계정구분'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
								name		: 'acct_bacd_name',
								pair		: 'acct_code',
								width		:  230,
								labelWidth	:  100,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name		: 'acct_code', xtype : 'textfield' , hidden : true, value		: '1001',
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								labelWidth	:  60,
								width		: 140,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' )),
								value		: ''
							},{	fieldLabel	: Language.get('acpt_date','등록기간'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 2',
								root		: true,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								labelWidth	: 15,
								width		: 115,
								value		: new Date(),
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: '품목분류'	,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 370,
								name		: 'clss_desc',
								pair		: '',
								margin		: '0 5 0 0',
								clearable	: true ,
								hidden		: (_global.hq_id.toUpperCase()=='N1000NBOLT'),
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-clss-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('clss_desc'));
										me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
										me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
										me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
									}
								},
								listeners	: {
									change	: function(){
										var val = this.getValue();
										if( val == '' || val == null ){
											me.down('[name=lcls_idcd]').reset();
											me.down('[name=mcls_idcd]').reset();
											me.down('[name=scls_idcd]').reset();
										}
									}
								}
							},{	name		: 'lcls_idcd', xtype : 'textfield' , hidden : true
							},{	name		: 'mcls_idcd', xtype : 'textfield' , hidden : true
							},{	name		: 'scls_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},
				]
			};
		return line;
	}

});