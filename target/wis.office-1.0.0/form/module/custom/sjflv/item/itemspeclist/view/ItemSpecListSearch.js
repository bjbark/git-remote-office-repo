Ext.define('module.custom.sjflv.item.itemspeclist.view.ItemSpecListSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-itemspeclist-search',

	initComponent: function(){
		var me = this;
		me.items =  [
			me.searchBasic(),
			me.createLine1(),
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
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	fieldLabel	: '계정구분',
								xtype		: 'popupfield',
								name		: 'acct_bacd',
								pair		: 'acct_code',
								clearable		: true,
								width		: 130,
								labelWidth	: 50,
								value		: '제품',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								},
							},{	name		: 'acct_code', xtype : 'textfield' , hidden : true, value		: '3000',
								listeners	: {
									change	: function(){
										var searchForm = Ext.ComponentQuery.query('module-itemspec-search')[0];
										searchForm.down('[name=item_name]').popup.params.acct_bacd = this.getValue();
									}
								},
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 품목코드 또는 품명을 입력하세요...',
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
					},
				]
			};
		return line;
	},

	createLine1 : function(){
		var	me	= this,
		line =
			{	xtype      : 'fieldset',
				title      : '상세검색',
				collapsible: true,
				collapsed  : false,
				layout     : 'vbox', //,
				defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 4 25', padding:'0', border: 0 },
				items : [
					{	xtype : 'fieldset',
						items : [
							{	fieldLabel	: '품목코드',
								name		: 'item_name',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								pair		: 'item_idcd',
								width		: 250,
								clearable	: true,
								emptyText	: Const.infoNull.queryAll,
								popup		: {
								widget		: 'lookup-item-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, row_sts : '1'  },
									result	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name		: 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: '~',
								name		: 'item_name2',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								pair		: 'item_idcd2',
								labelWidth	: 15,
								width		: 235,
								clearable	: true,
								popup		: {
								widget		: 'lookup-item-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, row_sts : '1'  },
									result	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name		: 'item_idcd2', xtype : 'textfield' , hidden : true
							},
/*							
							{	fieldLabel	: '등록기간',
								name		: 'fr_dt',
								pair		: 'to_dt',
								root		:  true ,
								xtype		: 'betweenfield',
								width		: 175,
								margin		: '0 2 0 7',
								value		: ''
							},{	fieldLabel	: '~',
								name		: 'to_dt',
								pair		: 'fr_dt' ,
								xtype		: 'betweenfield',
								width		: 113,
								labelWidth	: 8,
								value		: ''
							}
*/							
						]
					},{	fieldLabel	: '품목분류'	,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						width		: 485,
						name		: 'clss_desc',
						pair		: '',
						clearable	: true ,
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
			};
	return line;
	},


});