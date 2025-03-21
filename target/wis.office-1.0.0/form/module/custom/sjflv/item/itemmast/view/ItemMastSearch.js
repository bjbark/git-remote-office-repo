Ext.define('module.custom.sjflv.item.itemmast.view.ItemMastSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-itemmast-search',

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
							{	fieldLabel	: Language.get('item','품명'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name		: 'item_name',
								pair		: 'item_idcd',
								clearable	: true,
								width		: 300,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-item-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' },
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
//										me.down('[name=acct_code]').setValue(records[0].get('acct_bacd'));
//										me.down('[name=acct_bacd_name]').setValue(records[0].get('acct_bacd_name'));
									}
								}
							},{	name		: 'item_idcd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								labelWidth	:  60,
								width		: 140,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' )),
								value		: '0',
								clearable	: true,
							}/*,{	fieldLabel	: Language.get('','계정구분'),
								xtype		: 'lookupfield',
								name		: 'acct_bacd',
								lookupValue	: [['1001','원재료'],['1002','부재료'],['2001','제공품'],['2002','반제품'],['2003','품목보고서'],['3000','제품']],
								//multiSelect	: true ,
								editable	: true,
								labelWidth	: 99,
								width		: 380,
								clearable	: true,
							}*/,{
								xtype		: 'checkboxgroup',
								items: [
							            { boxLabel: '원재료', 		name: 'acct_bacd', inputValue: '1001', width : 60 },
							            { boxLabel: '부재료', 		name: 'acct_bacd', inputValue: '1002', width : 60 },
							            { boxLabel: '제공품', 		name: 'acct_bacd', inputValue: '2001', width : 60 },
							            { boxLabel: '반제품', 		name: 'acct_bacd', inputValue: '2002', width : 60 },
							            { boxLabel: '제품',		name: 'acct_bacd', inputValue: '3000', width : 50 },
							            { boxLabel: '상품', 		name: 'acct_bacd', inputValue: '4000', width : 50 },
							            { boxLabel: '품목보고서', 	name: 'acct_bacd', inputValue: '2003', width : 100, hidden: _global.hq_id.toUpperCase() == 'N1000SJFLV'? false : true },
							        ],
								labelWidth	: 1,
								width		: _global.hq_id.toUpperCase() == 'N1000SJFLV' ? 440 : 340,
								margin		: '0 0 0 45',
							}

						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: '품목분류'	,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 650,
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
							},{	fieldLabel	: Language.get('','내수/수출'),
								xtype		: 'lookupfield',
								name		: 'expt_dmst_dvcd',
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('expt_dmst_dvcd' )),
								width		: 165,
								labelWidth	: 70
							}
						]
					},
				]
			};
		return line;
	}

});